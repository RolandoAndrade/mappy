from django.contrib import admin
from .models import DeliveryAddress

# Register your models here.

@admin.register(DeliveryAddress)
class AdminDeliveryAddress(admin.ModelAdmin):
    list_display = ('longitude','latitude', 'description')
