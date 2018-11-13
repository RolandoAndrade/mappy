from django.db import models
from .validators import validate_number, validate_legnth, validate_Symbol, validate_Uppercase, validate_birthDate
from collection_address.models import CollectionAddress


# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key = True)
    collection_address = models.ForeignKey(CollectionAddress, null = True, blank = False, on_delete = models.CASCADE)
    email = models.EmailField(max_length = 254, unique = True)
    password = models.CharField(validators = [validate_Symbol, validate_legnth, validate_number, validate_Uppercase, ],
                                max_length = 35)
    birthDate = models.DateField(max_length = 8, validators = [validate_birthDate])
    firstName = models.CharField(max_length = 35)
    secondName = models.CharField(max_length = 35)
    firstSurname = models.CharField(max_length = 35)
    secondSurname = models.CharField(max_length = 35)

    def __str__(self):
        return self.firstName

    class Meta:
        ordering = ('user_id',)
