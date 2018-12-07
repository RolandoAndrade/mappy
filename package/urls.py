from .views import PackageCreate, PackageViewAll
from django.urls import path

urlpatterns = [
    path('create/', PackageCreate.as_view()),
    path('view', PackageViewAll.as_view()),
]
