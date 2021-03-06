from django.db import models
from datetime import datetime

class Client(models.Model):
    name = models.CharField(max_length=200, verbose_name=('Nombre'))
    last_name = models.CharField(max_length=200, verbose_name=('Apellido'))
    age = models.IntegerField(verbose_name=('Edad'))
    id_number = models.CharField(max_length=200, verbose_name=('Cedula'), unique=True)
    password = models.CharField(max_length=200, verbose_name=('Password'))
    nickname = models.CharField(max_length=200, primary_key=True, verbose_name=('Nickname'))
    type_Client =  models.IntegerField(verbose_name=('Valor'), default=0)
    points = models.IntegerField(verbose_name=('Saldo'), default=3000)

    def __str__(self):
        return "%s %s" % (self.name,self.last_name) 

    def addPaid(self, monto):
        self.points += monto
        return self.points

    def lessPaid(self, monto):
        self.points -= monto
        return self.points        

    class Meta:
        verbose_name = ('Usuario')
        verbose_name_plural = ('Usuarios')


class Transaction(models.Model):
    id_transaction = models.IntegerField(verbose_name=('Numero de transaccion'))
    fecha = models.DateTimeField(verbose_name=("Fecha y hora de transaccion"), default=datetime.now)
    remitente = models.ForeignKey('Client', related_name='cliente1',null=True)
    receptor = models.ForeignKey('Client', related_name='cliente2',null=True)
    concepto = models.CharField(max_length=200, verbose_name=('Concepto'), null=True)
    monto = models.IntegerField(verbose_name=('Monto de transferencia'),null=True)

    def __str__(self):
        return "%s realizo transferencia de monto: %d a %s." % (self.remitente,self.monto,self.receptor)

    class Meta:
        verbose_name = ('Transaccion')
        verbose_name_plural = ('Transacciones')    
