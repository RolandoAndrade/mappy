from django.urls import path
from .views import signup, main


urlpatterns = [
    path('signup/', signup, name="signup"),
    path('main/', main, name="main"),
]
