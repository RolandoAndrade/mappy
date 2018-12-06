from rest_framework.serializers import ModelSerializer
from collection_order.models import DeliveryAddress


class DeliveryAddressSerializer(ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = ('delivery_address_id', 'line1', 'line2', 'zipCode', 'city', 'country', 'description', 
        'latitude', 'longitude')


class UpdateDeliveryAddress(ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = ('delivery_address_id',)


