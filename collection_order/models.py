from django.db import models
from user.models import User
from collection_address.models import CollectionAddress
from package.models import Package
from delivery_address.models import DeliveryAddress


# Create your models here.

class CollectionOrder(models.Model):
    collection_order_id = models.AutoField(primary_key = True)
    user_id = models.OneToOneField(User, on_delete = models.SET_NULL, null = True)
    package_id = models.ForeignKey(Package, on_delete = models.CASCADE, null = False, blank = False)
    collection_address_id = models.OneToOneField(CollectionAddress, on_delete = models.CASCADE,
                                                 null = True, related_name = "collection_address")
    delivery_address_id = models.OneToOneField(DeliveryAddress, on_delete = models.CASCADE,
                                               null = True, related_name = "delivery_address")
    recipientsName = models.CharField(max_length = 35)
    recipientsSurname = models.CharField(max_length = 35)
