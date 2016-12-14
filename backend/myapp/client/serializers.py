from rest_framework import serializers
from .models import Client, Transaction

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client

class TransactionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Transaction