from django.contrib import admin
from .models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm


# Register your models here.


class AdminUser(admin.ModelAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = (
        'email', 'password', 'user_id', 'birthDate', 'firstName', 'secondName', 'firstSurname', 'secondSurname')


admin.site.register(User, AdminUser)
