from .views import CreateCollectionOrder,ViewAllCollectionOrders,RetrieveCollectionOrdersOfUser, RemoveCollectionOrder
from django.urls import path

urlpatterns = [
    path('create', CreateCollectionOrder.as_view(), name = "createAnOrder"),
    path('view', ViewAllCollectionOrders.as_view()),
    path('getAll', RetrieveCollectionOrdersOfUser.as_view(), name = "getAllCollectionOrders"),
    path('remove/<pk>', RemoveCollectionOrder.as_view()),
]