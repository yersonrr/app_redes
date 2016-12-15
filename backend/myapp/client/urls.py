from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .viewsets import ClientViewSet, TransactionViewSet, GeneralLog, PaidView

# Router for RESTful API
rest_router = DefaultRouter()
rest_router.register(r'Clients', ClientViewSet)
rest_router.register(r'Transaction', TransactionViewSet)

urlpatterns = [
	url(r'^generallog$', GeneralLog.as_view(), name='generalLog'),
	url(r'^paidview$', PaidView.as_view(), name='paidView'),
	url(r'^', include(rest_router.urls)),
]