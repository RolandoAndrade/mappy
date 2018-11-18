from rest_framework.serializers import ModelSerializer
from .models import User
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer
from rest_framework import serializers
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

class DisableSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email',)

