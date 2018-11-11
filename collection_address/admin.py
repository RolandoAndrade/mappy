from django.contrib import admin
from .models import CollectionAddress

admin.site.register(CollectionAddress)


class AdminCollectionAddress(admin.ModelAdmin):
    list_display = ('line1', 'line2', 'zipCode', 'city', 'country')
