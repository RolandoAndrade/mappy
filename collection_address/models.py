from django.db import models


class CollectionAddress(models.Model):
    delivery_address_id = models.AutoField(primary_key = True)
    line1 = models.CharField(max_length = 35, null = True)
    line2 = models.CharField(max_length = 35, null = True)
    zipCode = models.CharField(max_length = 35, null = True)
    city = models.CharField(max_length = 35, null = True)
    country = models.CharField(max_length = 35, null = True)

    def __str__(self):
        return self.line1
