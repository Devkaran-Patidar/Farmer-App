from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.products),
    path('cart/', views.cart),
    path('orders/place/', views.place_order),
    path('orders/history/', views.order_history),
]
