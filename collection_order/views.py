from rest_framework import generics
from . import models
from . import serializers


class CreateCollectionOrder(generics.CreateAPIView):
    serializer_class = serializers.CollectionOrderSerializer
    queryset = models.CollectionOrder.objects.all()

    def perform_create(self, serializer):
        serializer.save(user_id = self.request.user)


class ViewAllCollectionOrders(generics.ListAPIView):
    serializer_class = serializers.CollectionOrderSerializer
    queryset = models.CollectionOrder.objects.all()


class RetrieveCollectionOrdersOfUser(generics.ListAPIView):
    serializer_class = serializers.CollectionOrderSerializer

    def get_queryset(self):
        user = self.request.user
        return models.CollectionOrder.objects.filter(user_id = user.user_id)
