from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    user_id = models.AutoField(primary_key = True)
    birthDate = models.DateField(max_length = 8, null = True, blank = True)
    firstName = models.CharField(max_length = 35, null = True, blank = True)
    secondName = models.CharField(max_length = 35, null = True, blank = True)
    firstSurname = models.CharField(max_length = 35, null = True, blank = True)
    secondSurname = models.CharField(max_length = 35, null = True, blank = True)
    enabled = models.BooleanField(default = True)
    image = models.TextField(null = True, blank = True)

    def __str__(self):
        return self.firstName

    def save(self, *args, **kwargs):
        if not self.user_id:
            username = self.username
            username_exists = True
            counter = 1
            self.username = username
            while username_exists:
                try:
                    username_exists = User.objects.get(username = username)
                    if username_exists:
                        username = self.username + '_' + str(counter)
                        counter += 1
                except User.DoesNotExist:
                    self.username = username
                    break
        super(User, self).save(*args, **kwargs)
