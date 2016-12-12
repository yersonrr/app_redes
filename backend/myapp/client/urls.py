from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .viewsets import ClientViewSet

# Router for RESTful API
rest_router = DefaultRouter()
rest_router.register(r'Clients', ClientViewSet)

urlpatterns = [
	url(r'^', include(rest_router.urls)),
]