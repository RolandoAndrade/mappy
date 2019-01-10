from django.test import TestCase
from django.urls import reverse

from user.models import User
from collection_order.models import CollectionOrder
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate


class UserData:
    user = None


class CreateCollectionOrderTest(APITestCase):
    def setUp(self):
        user = User.objects.create(email = "rolandoandradefernandez@gmail.com",
                                   firstName = "Rolando",
                                   secondName = "José",
                                   firstSurname = "Andrade",
                                   secondSurname = "Fernández",
                                   password = 'Wer*Nicht#Kampt$Hat@Shon26728918Verloren')
        UserData.user = user
        self.client = APIClient()
        self.client.force_authenticate(user = user)

    def test_create_collection_order(self):
        self.data = {'collection_address_id': None,
                     'delivery_address_id': None,
                     'recipientsName': "Loredana",
                     'recipientsSurname': "Hernández"}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_collection_order_none(self):
        self.data = {'collection_address_id': None,
                     'delivery_address_id': None,
                     'recipientsName': None,
                     'recipientsSurname': None}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GetCollectionOrderTest(APITestCase):
    def setUp(self):
        user = User.objects.create(email = "rolandoandradefernandez@gmail.com",
                                   firstName = "Rolando",
                                   secondName = "José",
                                   firstSurname = "Andrade",
                                   secondSurname = "Fernández",
                                   password = 'Wer*Nicht#Kampt$Hat@Shon26728918Verloren')
        self.client = APIClient()
        self.client.force_authenticate(user = user)
        self.data = {'collection_address_id': None,
                     'delivery_address_id': None,
                     'recipientsName': "Loredana",
                     'recipientsSurname': "Hernández"}
        self.client.post(reverse('createAnOrder'), data = self.data)

    def test_get_collection_orders(self):
        response = self.client.get(reverse('getAllCollectionOrders'))
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
