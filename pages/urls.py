from django.urls import path
from .views import signup, index, login, addAddress


urlpatterns = [
    path('signup/', signup, name = "signup"),
    path('login/', login, name = "login"),
    path('add_address/', addAddress, name = "addAddress"),
    path('', index, name="index"),
]
