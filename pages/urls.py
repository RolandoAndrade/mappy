from django.urls import path
from .views import signup, index, login, dashboard


urlpatterns = [
    path('signup/', signup, name = "signup"),
    path('login/', login, name = "login"),
    path('dashboard/', dashboard, name = "dashboard"),
    path('', index, name="index"),
]
