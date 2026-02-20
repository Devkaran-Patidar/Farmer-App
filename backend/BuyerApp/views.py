from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import *
from .serializers import *
from FarmerApp.models import ProductModel
from rest_framework.permissions import AllowAny
# List Products
@api_view(['GET'])
@permission_classes([AllowAny])
def products(request):
    qs = ProductModel.objects.all().order_by('-id')
    serializer = ProductSerializer(qs, many=True)
    return Response(serializer.data)

# Cart
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def cart(request):
    cart_obj, _ = Cart.objects.get_or_create(buyer=request.user)
    if request.method=='POST':
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity',1)
        product = Product.objects.get(id=product_id)
        item, _ = CartItem.objects.get_or_create(cart=cart_obj, product=product, defaults={'quantity':quantity,'price':product.price})
        item.quantity = quantity
        item.price = product.price * quantity
        item.save()
    serializer = CartSerializer(cart_obj)
    return Response(serializer.data)

# Place Order
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    cart_obj = Cart.objects.get(buyer=request.user)
    order = Order.objects.create(
        buyer=request.user,
        total_amount=sum([i.price for i in cart_obj.items.all()]),
        status='pending'
    )
    for item in cart_obj.items.all():
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.price
        )
    cart_obj.items.all().delete()
    return Response(OrderSerializer(order).data)

# Order History
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_history(request):
    orders = Order.objects.filter(buyer=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
