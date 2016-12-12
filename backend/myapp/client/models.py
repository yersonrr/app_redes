from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=200, verbose_name=('Nombre'))
    last_name = models.CharField(max_length=200, verbose_name=('Apellido'))
    age = models.IntegerField(verbose_name=('Edad'))
    id_number = models.CharField(max_length=200, verbose_name=('Cedula'))
    password = models.CharField(max_length=200, verbose_name=('Password'))
    nickname = models.CharField(max_length=200, verbose_name=('Nickname'))
    type_Client =  models.IntegerField(verbose_name=('Valor'), default=0)
    points = models.IntegerField(verbose_name=('Saldo'), default=3000)

    def __str__(self):
        return "%s %s" % (self.name,self.last_name) 

    class Meta:
        verbose_name = ('Usuario')
        verbose_name_plural = ('Usuarios')