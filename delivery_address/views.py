from rest_framework import generics
from . import models
from . import serializers


# Create your views here.

class DeliveryAddressCreate(generics.ListCreateAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer

    def perform_create(self, serializer):
        serializer.save(user_id = self.request.user)


class DeliveryAddressRetrieve(generics.ListAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer


class DeliveryAddressRemove(generics.DestroyAPIView):
    queryset = models.DeliveryAddress.objects.all()
    serializer_class = serializers.DeliveryAddressSerializer
