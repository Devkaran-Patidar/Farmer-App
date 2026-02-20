from django.db import models
from django.conf import settings

class productModel(models.Model):

    farmer_id= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    product_img = models.ImageField(upload_to="produt_photos")
    name = models.CharField(max_length =100)
    category = models.CharField (max_length = 255)
    price_per_unit = models.IntegerField()
    available_quantity = models.IntegerField()
    unit_type = models.CharField(max_length=20)

    QUALITY_CHOICES = [
        ('A', 'Grade A'),
        ('B', 'Grade B'),
        ('Organic', 'Organic'),
        ('Premium', 'Premium'),
    ]
    quality_grade = models.CharField(
        max_length=20,
        choices=QUALITY_CHOICES
    )
    harvest_date = models.DateField()
    description = models.CharField(max_length=150)

    ORGANIC_CHOICES = [
        ('Organic', 'Organic'),
        ('Non-Organic', 'Non-Organic'),
    ]

    org_norg = models.CharField(max_length=20,choices = ORGANIC_CHOICES)
    location = models.CharField(max_length=100)
    delivery_option = models.CharField(max_length=50)

    def __str__(self):
        return self.name



# class Order(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     buyer = models.ForeignKey(User, on_delete=models.CASCADE)
#     quantity = models.IntegerField()
#     total_price = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=50, default="pending")
#     created_at = models.DateTimeField(auto_now_add=True)



# buyerrr=====


class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    def __str__(self):
        return f"{self.user.username}'s Cart"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(productModel, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'product') 
