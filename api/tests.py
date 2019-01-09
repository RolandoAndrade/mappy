from django.test import TestCase
from django.urls import reverse

from user.models import User
from collection_order.models import CollectionOrder
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory


class GetCollectionOrderTest(APITestCase):
    def setUp(self):
        self.superuser = User.objects.create(email = 'john@snow.com', password = 'johnpassword')
        self.client.login(username='john', password='johnpassword')
        self.collectionOrder = CollectionOrder.objects.create(collection_address_id = None,
                                                              delivery_address_id = None,
                                                              recipientsName = "Juan",
                                                              recipientsSurname = "Jon")

    def test_can_read_user_list(self):
        response = self.client.get(reverse('getAllCollectionOrders'))
        print(response.data)
        print(self.collectionOrder.recipientsName)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
