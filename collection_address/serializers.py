from rest_framework.serializers import ModelSerializer
from collection_order.models import CollectionAddress


class CollectionAddressSerializer(ModelSerializer):
    class Meta:
        model = CollectionAddress
        fields = ('collection_address_id', 'line1', 'line2', 'zipCode', 'city', 'country', 'user_id_id')


class UpdateCollectionAddress(ModelSerializer):
    class Meta:
        model = CollectionAddress
        fields = ('collection_address_id',)


