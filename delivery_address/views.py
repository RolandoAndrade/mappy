from rest_framework import generics
from . import models
from . import serializers
from delivery_address.models import DeliveryAddress
from rest_framework.response import Response
from django.shortcuts import render

# Create your views here.

class DeliveryAddressCreate(generics.ListCreateAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer

    def create(self, request, *args, **kwargs):
        request.data["delivery_address_id"] = request.deliveryAddress.delivery_address_id
        return super(generics.ListCreateAPIView, self).create(request, *args, **kwargs)


class DeliveryAddressAdd(generics.UpdateAPIView):
    queryset = DeliveryAddress.objects.all()
    serializer_class = serializers.UpdateDeliveryAddress

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delivery_address_id = request.data.get("delivery_address_id")
        instance.save()
        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception = True)
        self.perform_update(serializer)

        return Response(serializer.data)

class DeliveryAddressRetrieve(generics.ListAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer

