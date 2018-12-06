from rest_framework import generics
from . import models
from . import serializers


class PackageCreate(generics.CreateAPIView):
    queryset = models.Package.objects.all()
    serializer_class = serializers.PackageSerializer


class PackageViewAll(generics.ListAPIView):
    queryset = models.Package.objects.all()
    serializer_class = serializers.PackageSerializer
