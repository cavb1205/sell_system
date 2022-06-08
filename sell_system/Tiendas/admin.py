from django.contrib import admin
from .models import Ciudad, Moneda, Tienda, Cierre_Caja

# Register your models here.
class MonedaAdmin(admin.ModelAdmin):
    list_display = ('id','nombre','codigo')

admin.site.register(Ciudad)
admin.site.register(Moneda,MonedaAdmin)
admin.site.register(Tienda)
admin.site.register(Cierre_Caja)