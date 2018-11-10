from django.contrib import admin
from .models import CollectionOrder, CollectionAdress
# Register your models here.

@admin.register(CollectionOrder)
class AdminCollectionOrder(admin.ModelAdmin):
    list_display = ('colectionOrder_id', 'user', 'recipientsName', 'recipientsSurname')


@admin.register(CollectionAdress)
class AdminCollectionAdress(admin.ModelAdmin):
    list_display = ('line1', 'line2', 'zipCode', 'city', 'country')