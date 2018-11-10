from django.contrib import admin
from .models import CollectionOrder


# Register your models here.
"""
@admin.register(CollectionOrder)
class AdminCollectionOrder(admin.ModelAdmin):
    list_display = ('collectionOrder_id', 'user', 'recipientsName', 'recipientsSurname')
"""