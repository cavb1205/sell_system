from django.urls import path
from . import views


urlpatterns = [
    
    ### VENTAS ####
    path('', views.list_ventas, name='list_ventas'),
    path('<int:pk>/', views.get_venta, name='detail_venta'),
    path('create/', views.post_venta, name='create_venta'),
    path('<int:pk>/update/', views.put_venta, name='update_venta'),
    path('<int:pk>/delete/', views.delete_venta, name='delete_venta'),
]