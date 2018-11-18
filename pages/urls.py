from django.urls import path
from .views import signup, index, login


urlpatterns = [
    path('signup/', signup, name = "signup"),
    path('login/', login, name = "login"),
    path('', index, name="index"),
]
