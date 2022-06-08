

from django.contrib import admin
from django.urls import path, include





urlpatterns = [
    path('admin/', admin.site.urls),
    path('tiendas/', include('Tiendas.urls')),
    path('trabajadores/', include('Trabajadores.urls')),
    path('clientes/', include('Clientes.urls')),
    path('aportes/', include('Aportes.urls')),
]
