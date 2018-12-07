from rest_framework.serializers import ModelSerializer

from package.serializers import PackageSerializer
from .models import CollectionOrder


class CollectionOrderSerializer(ModelSerializer):
    order=PackageSerializer(many = True, read_only = True)

    class Meta:
        model = CollectionOrder
        fields = ('collection_order_id', 'user_id', 'collection_address_id', 'delivery_address_id',
                  'recipientsName', 'recipientsSurname', 'order',)

