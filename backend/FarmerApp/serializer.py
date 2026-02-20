from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import productModel

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model =productModel
        fields ='__all__'
        read_only_fields = ['farmer_id']




from .models import CartItem 
class CartItemSerializer(serializers.ModelSerializer):
    product = productSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

