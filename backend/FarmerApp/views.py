from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import productModel
from .serializer import productSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def add_product(request):
    serializer = productSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(farmer_id=request.user)  # ✅ set automatically
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Myproduct(request):

    products = productModel.objects.filter(farmer_id=request.user)

    serializer = productSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def Deleteproduct(request, id):

    try:
        product = productModel.objects.get(id=id, farmer_id=request.user)
    except productModel.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    product.delete()

    return Response({"message": "Product deleted successfully"})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def Editproduct(request, id):

    try:
        product = productModel.objects.get(id=id, farmer_id=request.user)
    except productModel.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    serializer = productSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


# -------------------------buyer---------------


from rest_framework.permissions import AllowAny
@api_view(['GET'])
@permission_classes([AllowAny])
def AllProducts(request):
    qs = productModel.objects.all().order_by('-id')
    serializer = productSerializer(qs, many=True)
    return Response(serializer.data)



from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Cart, CartItem, productModel
from .serializer import CartItemSerializer
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def add_to_cart(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    product = get_object_or_404(productModel, id=product_id)

    if product.available_quantity < quantity:
        return Response({"error": "Not enough stock"}, status=400)

    cart, _ = Cart.objects.get_or_create(user=request.user)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity

    cart_item.save()

    return Response({"message": "Product added to cart"})




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    items = cart.items.all()
    serializer = CartItemSerializer(items, many=True)
    total_price = 0
    for item in items:
        total_price += item.product.price_per_unit * item.quantity
    return Response({
    "success": True,
    "items": serializer.data,
    "cart_total": total_price,
    "cart_count": items.count()
})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    quantity = int(request.data.get("quantity", 1))

    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)

    if cart_item.product.available_quantity < quantity:
        return Response({"error": "Not enough stock"}, status=400)

    cart_item.quantity = quantity
    cart_item.save()

    return Response({"message": "Cart updated"})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_cart_item(request, item_id):
    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)

    cart_item.delete()

    return Response({"message": "Item removed from cart"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def buy_now(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    product = get_object_or_404(productModel, id=product_id)

    if product.available_quantity < quantity:
        return Response({"error": "Not enough stock"}, status=400)

    # Reduce stock immediately
    product.available_quantity -= quantity
    product.save()

    total_price = product.price_per_unit * quantity

     # Remove item from user's cart if exists
    try:
        cart = Cart.objects.get(user=request.user)
        cart_item = CartItem.objects.get(cart=cart, product=product)
        cart_item.delete()
    except (Cart.DoesNotExist, CartItem.DoesNotExist):
        pass  # if cart or item doesn't exist, ignore

    return Response({
        "message": "Purchase successful",
        "product": product.name,
        "quantity": quantity,
        "total_price": total_price
    })