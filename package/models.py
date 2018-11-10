from django.db import models


# Create your models here.

class Package(models.Model):
    package_id = models.AutoField(primary_key = True)
    weight = models.DecimalField(max_digits = 20, decimal_places = 12, null = True)
    description = models.CharField(max_length = 35, null = True)
