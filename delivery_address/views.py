from rest_framework import generics
from . import models
from . import serializers


# Create your views here.

class DeliveryAddressCreate(generics.ListCreateAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer

    def create(self, request, *args, **kwargs):
        request.data["delivery_address_id"] = request.deliveryAddress.delivery_address_id
        return super(generics.ListCreateAPIView, self).create(request, *args, **kwargs)


class DeliveryAddressRetrieve(generics.ListAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer
