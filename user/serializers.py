from rest_framework.serializers import ModelSerializer
from .models import User
from collection_address.serializers import CollectionAddressSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'user_id', 'email', 'password', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname',)


class RegistrationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'user_id', 'email', 'password', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname')

    def save(self, request):
        return self.Meta.model


class UserDataSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'image',)


class CollectionAddressesOfUserSerializer(ModelSerializer):
    collection_address = CollectionAddressSerializer(many = True, read_only = True)

    class Meta:
        model = User
        fields = ('email', 'collection_address',)


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('image',)
