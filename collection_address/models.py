from django.db import models
from django.contrib.auth import get_user_model


class CollectionAddress(models.Model):
    collection_address_id = models.AutoField(primary_key = True)
    user_id = models.ForeignKey(get_user_model(), null = True, blank = False,
                                on_delete = models.CASCADE, related_name = "collection_address")
    line1 = models.CharField(max_length = 35, null = True)
    line2 = models.CharField(max_length = 35, blank = True, null = True)
    zipCode = models.CharField(max_length = 35, null = True)
    city = models.CharField(max_length = 35, null = True)
    country = models.CharField(max_length = 35, null = True)

    def __str__(self):
        return self.line1
