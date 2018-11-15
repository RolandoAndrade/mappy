from user.views import UserListView
from django.urls import path

urlpatterns = [
    path('', UserListView.as_view()),
]
