from django.contrib import admin
from .models import User

# Register your models here.
admin.site.register(User)


class AdminUser(admin.ModelAdmin):
    list_display = (
        'email', 'password', 'user_id', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname')
