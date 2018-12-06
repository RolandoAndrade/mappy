from .views import DeliveryAddressCreate, DeliveryAddressRetrieve
from django.urls import path

urlpatterns = [
    path('create', DeliveryAddressCreate.as_view()),
    path('view', DeliveryAddressRetrieve.as_view()),
]