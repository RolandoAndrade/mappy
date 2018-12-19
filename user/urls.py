from user.views import UserListView, RetrieveAUser, ProfileView
from django.urls import path

urlpatterns = [
    path('', UserListView.as_view()),
    path('get/<pk>', RetrieveAUser.as_view()),
    path('updateImage/<pk>', ProfileView.as_view()),
]
