from django.contrib import admin
from .models import Ciudad, Moneda, Tienda, Cierre_Caja

# Register your models here.


admin.site.register(Ciudad)
admin.site.register(Moneda)
admin.site.register(Tienda)
admin.site.register(Cierre_Caja)