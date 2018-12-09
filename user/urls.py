from user.views import UserListView, RetrieveAUser
from django.urls import path

urlpatterns = [
    path('', UserListView.as_view()),
    path('get/<pk>', RetrieveAUser.as_view()),
]
