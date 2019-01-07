from user.views import UserListView, RetrieveAUser, ProfileView, UpdateAUser, EnableUser, GiveMeTheUser
from django.urls import path

urlpatterns = [
    path('', UserListView.as_view()),
    path('get/<pk>', RetrieveAUser.as_view()),
    path('put/<pk>', UpdateAUser.as_view()),
    path('updateImage/<pk>', ProfileView.as_view()),
    path('enabled/<pk>', EnableUser.as_view()),
    path('giveMe', GiveMeTheUser.as_view()),

]
