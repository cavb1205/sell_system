from django.db import models


class Estado_Venta(models.Model):
    '''Estados de las ventas'''

    estado_venta = models.CharField(max_length=200)

    def __str__(self):
        return self.estado_venta


class Plazo(models.Model):
    plazo = models.CharField(max_length=50)

    def __str__(self):
        return self.plazo



class Venta(models.Model):
    '''Registro de las ventas de la tienda'''

    fecha_venta = models.DateField(auto_now=False)
    valor_venta = models.DecimalField(max_digits=10, decimal_places=2)
    interes = models.IntegerField(max_length=2, null=False, blank=False)
    cuotas = models.IntegerField(max_length=3, blank=False,null=False)
    plazo = models.ForeignKey(Plazo, on_delete=models.CASCADE)
    


