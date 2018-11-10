from django.db import models
from django_measurement.models import MeasurementField
from measurement.measures import Weight
# Create your models here.

class Package (models.Model):
    
    package_id = models.AutoField(primary_key=True)
    weight = MeasurementField(measurement=Weight, default=0.00)