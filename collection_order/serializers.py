from rest_framework.serializers import ModelSerializer
from package.serializers import PackageSerializer
from delivery_address.serializers import DeliveryAddressSerializer
from collection_address.serializers import CollectionAddressSerializer
from .models import CollectionOrder


class CollectionOrderSerializer(ModelSerializer):
    order = PackageSerializer(many = True, read_only = True)

    class Meta:
        model = CollectionOrder
        fields = ('collection_order_id', 'user_id', 'collection_address_id', 'delivery_address_id',
                  'recipientsName', 'recipientsSurname', 'order',)


class CollectionOrderSerializerExtended(ModelSerializer):
    order = PackageSerializer(many = True, read_only = True)
    delivery_address_id = DeliveryAddressSerializer(many = False, read_only = True)
    collection_address_id = CollectionAddressSerializer(many = False, read_only = True)

    class Meta:
        model = CollectionOrder
        fields = ('collection_order_id', 'user_id', 'collection_address_id', 'delivery_address_id',
                  'recipientsName', 'recipientsSurname', 'order',)
