from .views import DeliveryAddressCreate, DeliveryAddressRetrieve, DeliveryAddressAdd
from django.urls import path

urlpatterns = [
    path('create/', DeliveryAddressCreate.as_view()),
    path('add/<pk>', DeliveryAddressAdd.as_view()),
    path('view', DeliveryAddressRetrieve.as_view()),
]