from django.urls import reverse
from user.models import User
from collection_order.models import CollectionOrder
from collection_address.models import CollectionAddress
from delivery_address.models import DeliveryAddress
from rest_framework import status
from rest_framework.test import APITestCase, APIClient


class CreateCollectionOrderTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(email = "rolandoandradefernandez@gmail.com",
                                        firstName = "Rolando",
                                        secondName = "José",
                                        firstSurname = "Andrade",
                                        secondSurname = "Fernández",
                                        password = 'Wer*Nicht#Kampt$Hat@Shon26728918Verloren')
        self.client = APIClient()
        self.client.force_authenticate(user = self.user)

    def test_dont_exist_addresses(self):
        self.data = {'collection_address_id': 1,
                     'delivery_address_id': 1,
                     'recipientsName': "Loredana",
                     'recipientsSurname': "Hernández"}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_exist_addresses(self):
        self.collectionAddress = CollectionAddress.objects.create(country = "Venezuela", city = "Caracas",
                                                                  line1 = "UCAB", line2 = "Moltalbán",
                                                                  zipCode = "1041")
        self.deliveryAddress = DeliveryAddress.objects.create(country = "Venezuela", city = "Caracas",
                                                              line1 = "MIT", line2 = "Boston",
                                                              zipCode = "1020-3041")
        self.data = {'collection_address_id': self.collectionAddress.collection_address_id,
                     'delivery_address_id': self.deliveryAddress.delivery_address_id,
                     'recipientsName': "Loredana",
                     'recipientsSurname': "Hernández"}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_addresses_are_none(self):
        self.data = {'collection_address_id': None,
                     'delivery_address_id': None,
                     'recipientsName': "Loredana",
                     'recipientsSurname': "Hernández"}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_all_fields_are_none(self):
        self.data = {'collection_address_id': None,
                     'delivery_address_id': None,
                     'recipientsName': None,
                     'recipientsSurname': None}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_recipients_are_int(self):
        self.data = {'collection_address_id': None,
                     'delivery_address_id': None,
                     'recipientsName': 1,
                     'recipientsSurname': 2}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_recipients_data_is_greater_than_35_characters(self):
        self.data = {'collection_address_id': None,
                     'delivery_address_id': None,
                     'recipientsName': "Lorem ipsum sit ammet conquetur blablablaba",
                     'recipientsSurname': "Lorem ipsum sit ammet conquetur blablablaba"}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_addresses_are_strings(self):
        self.data = {'collection_address_id': "1",
                     'delivery_address_id': "1",
                     'recipientsName': "Loredana",
                     'recipientsSurname': "Hernández"}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_empty_request(self):
        self.data = {}
        response = self.client.post(reverse('createAnOrder'), data = self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GetCollectionOrderTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(email = "rolandoandradefernandez@gmail.com",
                                        firstName = "Rolando",
                                        secondName = "José",
                                        firstSurname = "Andrade",
                                        secondSurname = "Fernández",
                                        password = 'Wer*Nicht#Kampt$Hat@Shon26728918Verloren')
        self.client = APIClient()
        self.client.force_authenticate(user = self.user)
        self.collectionOrder = CollectionOrder.objects.create(collection_address_id = None,
                                                              delivery_address_id = None,
                                                              recipientsName = "Loredana",
                                                              recipientsSurname = "Hernández",
                                                              user_id = self.user)
        self.collectionOrder = CollectionOrder.objects.create(collection_address_id = None,
                                                              delivery_address_id = None,
                                                              recipientsName = "Milagros",
                                                              recipientsSurname = "Andrade",
                                                              user_id = self.user)
        self.collectionOrder = CollectionOrder.objects.create(collection_address_id = None,
                                                              delivery_address_id = None,
                                                              recipientsName = "Raúl",
                                                              recipientsSurname = "Baduel",
                                                              user_id = self.user)

    def test_get_collection_orders(self):
        response = self.client.get(reverse('getAllCollectionOrders'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

