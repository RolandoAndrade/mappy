from rest_framework import generics
from . import models
from . import serializers
from user.models import User
from rest_framework.response import Response


class CollectionAddressCreate(generics.ListCreateAPIView):
    queryset = models.CollectionAddress.objects.all()
    serializer_class = serializers.CollectionAddressSerializer

    def create(self, request, *args, **kwargs):
        request.data["user_id"] = request.user.user_id
        return super(generics.ListCreateAPIView, self).create(request, *args, **kwargs)


class CollectionAddressAdd(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UpdateCollectionAddress

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.user_id = request.data.get("user_id")
        instance.save()
        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception = True)
        self.perform_update(serializer)

        return Response(serializer.data)


class CollectionAddressRetrieve(generics.ListAPIView):
    queryset = models.CollectionAddress.objects.all()
    serializer_class = serializers.CollectionAddressSerializer
