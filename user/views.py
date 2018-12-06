from rest_framework import generics
from . import models
from . import serializers
from rest_framework.response import Response


class UserListView(generics.ListCreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class DisableUser(generics.UpdateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.DisableSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception = True)
        self.perform_update(serializer)

        return Response(serializer.data)


class EnableUser(generics.UpdateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.DisableSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = True
        instance.save()
        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception = True)
        self.perform_update(serializer)

        return Response(serializer.data)


class RetrieveCollectionAddresses(generics.ListAPIView):
    serializer_class = serializers.CollectionAddressesOfUserSerializer

    def get_queryset(self):
        user = self.request.user
        return models.User.objects.filter(user_id = user.user_id)
