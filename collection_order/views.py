from rest_framework import generics
from rest_framework.response import Response

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
    serializer_class = serializers.CollectionOrderSerializerExtended

    def get_queryset(self):
        user = self.request.user
        return models.CollectionOrder.objects.filter(user_id = user.user_id)


class RemoveCollectionOrder(generics.DestroyAPIView):
    serializer_class = serializers.CollectionOrderSerializer
    queryset = models.CollectionOrder.objects.all()

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        # just the user can delete his own collection order
        if instance.user_id == request.user:
            self.destroy(request, *args, **kwargs)
            return Response(data = "Deleted")
        else:
            return Response(data = "Error")
