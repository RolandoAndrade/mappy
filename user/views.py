from rest_framework import generics
from rest_framework.request import Request
from . import models
from . import serializers
from rest_framework.response import Response


class UserListView(generics.ListCreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class EnableUser(generics.UpdateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.DisableSerializer


class RetrieveCollectionAddresses(generics.ListAPIView):
    serializer_class = serializers.CollectionAddressesOfUserSerializer

    def get_queryset(self):
        user = self.request.user
        return models.User.objects.filter(user_id = user.user_id)


class RetrieveDeliveryAddresses(generics.ListAPIView):
    serializer_class = serializers.DeliveryAddressesOfUserSerializer

    def get_queryset(self):
        user = self.request.user
        return models.User.objects.filter(user_id = user.user_id)


class RetrieveAUser(generics.RetrieveAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserDataSerializer

    def get(self, request, *args, **kwargs):
        if kwargs.get('pk') == 'me':
            return Response(self.get_serializer(request.user).data)
        return Response("Error")


class UpdateAUser(generics.UpdateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UpdateUserSerializer

    def put(self, request, *args, **kwargs):
        if kwargs.get('pk') == 'me':
            kwargs = {'pk': request.user.pk}
            self.kwargs = kwargs
            return self.update(request, *args, **kwargs)
        return Response("Error")


class ProfileView(generics.UpdateAPIView):
    serializer_class = serializers.ProfileSerializer
    queryset = models.User.objects.all()

    def put(self, request, *args, **kwargs):
        if kwargs.get('pk') == 'me':
            kwargs = {'pk': request.user.pk}
            self.kwargs = kwargs
            return self.update(request, *args, **kwargs)
        return Response("Error")


class GiveMeTheUser(generics.ListAPIView):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        user = self.request.query_params.get("user", None)
        print(user)
        return models.User.objects.filter(email = user)