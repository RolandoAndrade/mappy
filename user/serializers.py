from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
        'user_id', 'email', 'password', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname')
