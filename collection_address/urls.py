from .views import CollectionAddressCreate, CollectionAddressRetrieve, CollectionAddressAdd
from user.views import RetrieveCollectionAddresses
from django.urls import path

urlpatterns = [
    path('create/', CollectionAddressCreate.as_view()),
    path('add/<pk>', CollectionAddressAdd.as_view()),
    path('view', CollectionAddressRetrieve.as_view()),
    path('getAll', RetrieveCollectionAddresses.as_view()),
]