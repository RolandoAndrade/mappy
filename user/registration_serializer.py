try:
    from allauth.account import app_settings as allauth_settings
    from allauth.utils import email_address_exists
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")

from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers


class RegisterSerializer(RegisterSerializer):
    password2 = None
    username = None
    birthDate = serializers.DateField(required = True, write_only = True)
    firstName = serializers.CharField(required = True, write_only = True)
    secondName = serializers.CharField(required = False, write_only = True)
    firstSurname = serializers.CharField(required = True, write_only = True)
    secondSurname = serializers.CharField(required = False, write_only = True)

    def validate(self, data):
        return data

    def get_cleaned_data(self):
        return {
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),

        }

    def custom_signup(self, request, user):
        user.firstName = self.validated_data.get('firstName', '')
        user.secondName = self.validated_data.get('secondName', '')
        user.firstSurname = self.validated_data.get('firstSurname', '')
        user.secondSurname = self.validated_data.get('secondSurname', '')
        user.birthDate = self.validated_data.get('birthDate', '')
        user.save(update_fields = ['firstName', 'secondName', 'firstSurname', 'secondSurname', 'birthDate'])

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user
