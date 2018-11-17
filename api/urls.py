from django.urls import include, path
from .views import logout

urlpatterns = [
    path('users/', include('user.urls')),
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('collection_address/', include('collection_address.urls')),
    path('v/logout/', logout, name = "logout"),
]
