from django.urls import include, path
from .views import logout, disable

urlpatterns = [
    path('users/', include('user.urls')),
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('collection_address/', include('collection_address.urls')),
    path('delivery_address/', include('delivery_address.urls')),
    path('package/', include('package.urls')),
    path('v/logout/', logout, name = "logout"),
    path('disable/', disable, name = "disable"),
]
