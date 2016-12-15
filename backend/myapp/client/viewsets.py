from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import AllowAny
from .models import Client, Transaction
from .serializers import ClientSerializer, TransactionSerializer
from django.core import serializers

class ClientViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    fields = '__all__'

    class Meta:
        model = Client

class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    fields = '__all__'

    class Meta:
        model = Transaction

class GeneralLog(APIView):
    """View for login and logup"""
    permission_classes = (AllowAny, )

    def post(self, request, *arg, **kargs):

        try:
            data = request.data
            action = data["action"]
            if(action == 0):
                # Login
                nickname = data['nickname']
                password = data['password']
                client = Client.objects.filter(nickname=nickname)
                if not client:
                    answerData = {'id':-1, 'response':'No existe el usuario'}
                    return Response(answerData, status.HTTP_412_PRECONDITION_FAILED)

                client = client.values()[0]
                if client['password'] != password:
                    answerData = {'id':-1, 'response':'Contraseña Incorrecta'}
                    return Response(answerData, status.HTTP_412_PRECONDITION_FAILED)
                else:
                    del client['password']
                    del client['id']
                    answerData = {'id': 1, 'client':client}
                    return Response(answerData, status.HTTP_200_OK)                
            elif(action==1 or action==2):
                #Logup
                if(action == 2):
                    type_Client = data['type_Client']
                name = data['name']
                last_name = data['last_name']
                age = data['age']
                id_number = data['id_number']
                password = data['password']
                nickname = data['nickname']

                client = Client.objects.filter(id_number=id_number)
                if client:
                    answerData = {'id':-1, 'response':'Id de usuario ya registrado'}
                    return Response(answerData, status.HTTP_412_PRECONDITION_FAILED)

                client = Client.objects.filter(nickname=nickname)
                if client:
                    answerData = {'id':-1, 'response':'Nombre de usuario ya registrado'}
                    return Response(answerData, status.HTTP_412_PRECONDITION_FAILED)

                if(action == 1):
                    client = Client.objects.create(name=name, last_name=last_name, 
                        age=age, id_number=id_number, password=password, nickname=nickname)
                else:
                    client = Client.objects.create(name=name, last_name=last_name, 
                        age=age, id_number=id_number, password=password, nickname=nickname,
                        type_Client=type_Client)
                client = Client.objects.filter(nickname=nickname)
                client = client.values()[0]
                del client['password']
                del client['id']

                answerData = {'id': 1, 'client':client}
                return Response(answerData, status.HTTP_200_OK)
        except:
            return Response({request},status.HTTP_412_PRECONDITION_FAILED)
