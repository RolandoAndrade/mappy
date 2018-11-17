from django.urls import include, path

urlpatterns = [
    path('users/', include('user.urls')),
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('collection_address/', include('collection_address.urls')),
]
