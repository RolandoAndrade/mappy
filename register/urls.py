from django.urls import path
from .views import index
urlpatterns = [
    path('register/', index, name="index"),
]
