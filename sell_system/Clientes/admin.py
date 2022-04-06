from django.contrib import admin

from Clientes.models import Cliente, Estado_Cliente

# Register your models here.


admin.site.register(Cliente)
admin.site.register(Estado_Cliente)