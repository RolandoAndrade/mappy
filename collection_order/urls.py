from .views import CreateCollectionOrder,ViewAllCollectionOrders,RetrieveCollectionOrdersOfUser
from django.urls import path

urlpatterns = [
    path('create', CreateCollectionOrder.as_view()),
    path('view', ViewAllCollectionOrders.as_view()),
    path('getAll', RetrieveCollectionOrdersOfUser.as_view()),
]