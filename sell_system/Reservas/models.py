from django.db import models

from Clientes.models import Cliente
from Tiendas.models import Tienda



class Reserva(models.Model):
    '''Agendar reservas de ventas para los clientes'''

    fecha_entrega = models.DateField(auto_now=False)
    valor_solicitado = models.DecimalField(max_digits=10, decimal_places=2)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    estado_reserva = models.BooleanField(default=True)

    def __str__(self):
        return str(self.fecha_entrega) + ' ' + self.cliente.nombres + '' + ' Estado: ' + str(self.estado_reserva)

