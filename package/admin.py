from django.contrib import admin
from .models import Package

# Register your models here.

admin.site.register(Package)


class AdminPackage(admin.ModelAdmin):
    list_display = ('package_id', 'weight')
