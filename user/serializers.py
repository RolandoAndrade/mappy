from rest_framework.serializers import ModelSerializer
from .models import User
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer
from rest_framework import serializers
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'user_id', 'email', 'password', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname')

class RegistrationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'user_id', 'email', 'password', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname')

    def save(self, request):
        return self.Meta.model

"""class RegistrationSerializer(RegisterSerializer):
    email = serializers.EmailField(required = True)
    password = serializers.CharField(write_only = True)
    birthDate = serializers.DateField(required = True)
    firstName = serializers.CharField(required = True)
    secondName = serializers.CharField(required = True)
    firstSurname = serializers.CharField(required = True)
    secondSurname = serializers.CharField(required = True)

    def get_cleaned_data(self):
        super(RegisterSerializer, self).get_cleaned_data()
        return {
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'firstName': self.validated_data.get('firstName', ''),
            'secondName': self.validated_data.get('secondName', ''),
            'firstSurname': self.validated_data.get('firstSurname', ''),
            'secondSurname': self.validated_data.get('secondSurname', ''),
            'date_of_birth': self.validated_data.get('date_of_birth', ''),
        }

    class Meta:
        model = User
        fields = (
            'user_id', 'email', 'password', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname')
"""
class LoginSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')
