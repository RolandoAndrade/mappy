from rest_framework.serializers import ModelSerializer
from .models import DeliveryAddress


class DeliveryAddressSerializer(ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = ('delivery_address_id', 'line1', 'line2', 'zipCode', 'city',
                  'country', 'description', 'latitude', 'longitude',)

