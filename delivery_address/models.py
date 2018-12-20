from django.db import models
from django.contrib.auth import get_user_model


# Create your models here.

class DeliveryAddress(models.Model):
    delivery_address_id = models.AutoField(primary_key = True)
    line1 = models.CharField(max_length = 35, null = True)
    line2 = models.CharField(max_length = 35, null = True)
    zipCode = models.CharField(max_length = 35, null = True)
    city = models.CharField(max_length = 35, null = True)
    country = models.CharField(max_length = 35, null = True)
    description = models.CharField(max_length = 150, null = True)
    longitude = models.DecimalField(max_digits = 20, decimal_places = 12, null = True)
    latitude = models.DecimalField(max_digits = 20, decimal_places = 12, null = True)
    user_id = models.ForeignKey(get_user_model(), null = True, blank = False,
                                on_delete = models.CASCADE, related_name = "delivery_address")

    def __str__(self):
        return self.description
