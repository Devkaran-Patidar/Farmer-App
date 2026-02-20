from django.urls import path
from . import views

urlpatterns = [
    #============= farmer =========
    path("addproduct/", views.add_product),
    path("editproduct/<id>/",views.Editproduct),
    path("deleteproduct/<id>/",views.Deleteproduct),
    path("myproduct/",views.Myproduct),

    # ======= buyer =============
    path("allproducts/",views.AllProducts),
     path("add-to-cart/", views.add_to_cart),
    path("view-cart/", views.view_cart),
    path("update-cart/<int:item_id>/", views.update_cart_item),
    path("remove-cart/<int:item_id>/", views.remove_cart_item),
    path("buy-now/", views.buy_now),
]
