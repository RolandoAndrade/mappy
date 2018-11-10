from django.db import models

# Create your models here.

class DeliveryAddress(models.Model):

    description = models.CharField(max_length=35, null=True)
    longitude = models.DecimalField(max_digits=20, decimal_places=12, null=True)
    latitude = models.DecimalField(max_digits=20, decimal_places=12, null=True)

    def __str__(self):
        return self.description
    
