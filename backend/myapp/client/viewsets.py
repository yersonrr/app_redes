from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import AllowAny
from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    fields = '__all__'

    class Meta:
        model = Client