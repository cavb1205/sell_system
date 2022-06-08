from django.db import models

from Clientes.models import Cliente
from Tiendas.models import Tienda



class Venta(models.Model):
    '''Registro de las ventas de la tienda'''

    Estado_Venta_Choises = [
        ('Vigente','Vigente'),
        ('Vencido','Vencido'),
        ('Pagado','Pagado'),
        ('Perdida','Perdida'),
    ]

    Plazo_Venta_Choises = [
        ('Diario','Diario'),
        ('Semanal','Semanal'),
        ('Mensual','Mensual'),
        ('Anual','Anual'),
    ]


    fecha_venta = models.DateField(auto_now=False)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    valor_venta = models.DecimalField(max_digits=10, decimal_places=2)
    interes = models.IntegerField(null=False, blank=False, default=20)
    cuotas = models.IntegerField(blank=False,null=False, default=20)
    plazo = models.CharField(max_length=10, choices=Plazo_Venta_Choises, default='Diario')
    comentario = models.CharField(max_length=100, blank=True,)
    estado_venta = models.CharField(max_length=10, choices=Estado_Venta_Choises, default='Vigente')
    tienda = models.ForeignKey(Tienda,on_delete=models.CASCADE)

    def __str__(self):
        return self.cliente.nombres





    


