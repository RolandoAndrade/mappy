from user.views import RetrieveDeliveryAddresses
from .views import DeliveryAddressCreate, DeliveryAddressRetrieve, DeliveryAddressRemove
from django.urls import path

urlpatterns = [
    path('create', DeliveryAddressCreate.as_view()),
    path('view', DeliveryAddressRetrieve.as_view()),
    path('delete/<pk>', DeliveryAddressRemove.as_view()),
    path('getAll', RetrieveDeliveryAddresses.as_view()),
]