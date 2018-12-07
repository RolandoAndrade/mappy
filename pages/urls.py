from django.urls import path
from .views import signup, index, login, addAddress, addPackage, dashboard


urlpatterns = [
    path('signup/', signup, name = "signup"),
    path('login/', login, name = "login"),
    path('dashboard/', dashboard, name = "dashboard"),
    path('add_address/', addAddress, name = "addAddress"),
    path('', index, name="index"),
    path('add_package/', addPackage, name="addPackage"),
]
