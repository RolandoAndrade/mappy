from django.db import models
from user.models import User


class CollectionAddress(models.Model):
    collection_address_id = models.AutoField(primary_key = True)
    user_id = models.ForeignKey(User, null = True, blank = False, on_delete = models.CASCADE)
    line1 = models.CharField(max_length = 35, null = True)
    line2 = models.CharField(max_length = 35, null = True)
    zipCode = models.CharField(max_length = 35, null = True)
    city = models.CharField(max_length = 35, null = True)
    country = models.CharField(max_length = 35, null = True)

    def __str__(self):
        return self.line1
