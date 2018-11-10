from django.db import models
from coordinates.models import DeliveryAddress
from user.models import User


# Create your models here.

class CollectionAdress(DeliveryAddress):

    line1 = models.CharField(max_length=35, null=True)
    line2 = models.CharField(max_length=35, null=True)
    zipCode = models.CharField(max_length=35, null=True)
    city = models.CharField(max_length=35, null=True)
    country = models.CharField(max_length=35, null=True)
    collectionAdress_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.line1

class CollectionOrder(models.Model):

    collectionAdress = models.OneToOneField(CollectionAdress, on_delete=models.CASCADE, null=True)
    colectionOrder_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    recipientsName = models.CharField(max_length=35) 
    recipientsSurname = models.CharField(max_length=35)   
