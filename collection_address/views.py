from rest_framework import generics
from . import models
from . import serializers
from collection_address.models import CollectionAddress
from rest_framework.response import Response


class CollectionAddressCreate(generics.ListCreateAPIView):
    queryset = models.CollectionAddress.objects.all()
    serializer_class = serializers.CollectionAddressSerializer

    def perform_create(self, serializer):
        serializer.save(user_id = self.request.user)


class CollectionAddressAdd(generics.UpdateAPIView):
    queryset = CollectionAddress.objects.all()
    serializer_class = serializers.UpdateCollectionAddress

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.collection_address_id = request.data.get("collection_address_id")
        instance.save()
        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception = True)
        self.perform_update(serializer)

        return Response(serializer.data)


class CollectionAddressRetrieve(generics.ListAPIView):
    queryset = models.CollectionAddress.objects.all()
    serializer_class = serializers.CollectionAddressSerializer
