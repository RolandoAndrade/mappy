from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.password_validation import MinimumLengthValidator
from .validators import validate_number, validate_legnth, validate_Symbol, validate_Uppercase, validate_birthDate

# Create your models here.

class Guess(models.Model):

    email = models.EmailField(max_length=254, unique = True)
    password = models.CharField(validators=[validate_Symbol, validate_legnth, validate_number, validate_Uppercase, ], max_length=35)

class User(Guess):
    
    user_id = models.AutoField(primary_key=True)
    birthDate = models.DateField(max_length=8, validators=[validate_birthDate])
    firstName = models.CharField(max_length=35)
    secondName = models.CharField(max_length=35)
    firstSurname = models.CharField(max_length=35)
    secondSurname = models.CharField(max_length=35)

    def __str__(self):
        return self.firstName
    
    class Meta:
        ordering = ('id', )
