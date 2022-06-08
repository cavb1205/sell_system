from django.db import models
from django.contrib.auth.models import User
from datetime import *






class Ciudad(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Moneda(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=5)

    def __str__(self):
        return self.codigo + ' - ' + self.nombre



class Tienda(models.Model):
    nombre = models.CharField(max_length=200)
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    moneda = models.ForeignKey(Moneda, on_delete=models.CASCADE)
    fecha_registro = models.DateField(auto_now_add=True)
    administrador = models.ForeignKey(User, on_delete=models.CASCADE)
    caja_inicial = models.DecimalField(max_digits=10,decimal_places=2, default=0)
    estado = models.BooleanField(default=True)
    

    def __str__(self):
        return self.nombre



class Cierre_Caja(models.Model):
    fecha_cierre = models.DateField(auto_now=False)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    

    def __str__(self):
        return str(self.fecha_cierre)