
from django.db import models

from Tiendas.models import Tienda
from Trabajadores.models import Perfil
from Ventas.models import Venta


class Recaudo(models.Model):

    fecha_recaudo = models.DateField(auto_now=False)
    valor_recaudo = models.DecimalField(max_digits=10, decimal_places=2)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    trabajador = models.ForeignKey(Perfil, on_delete=models.CASCADE)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.fecha_recaudo)
