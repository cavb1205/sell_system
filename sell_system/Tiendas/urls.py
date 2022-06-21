from django.urls import path
from . import views

urlpatterns = [

    
    ###TIENDA###
    path('', views.list_tiendas , name='list_tiendas'),
    path('detail/', views.get_tienda, name='detail_tienda'),
    path('create/', views.post_tienda, name='create_tienda'),
    path('<int:pk>/update/', views.put_tienda, name='update_tienda'),
    path('<int:pk>/delete/', views.delete_tienda, name='delete_tienda'),

    ###CIUDADES####
    path('ciudades/', views.list_ciudades , name='list_ciudades'),
    path('ciudades/<int:pk>/', views.get_ciudad, name='detail_ciudad'),
    path('ciudades/<int:pk>/update/', views.put_ciudad, name='update_ciudad'),
    path('ciudades/create/', views.post_ciudad, name='create_ciudad'),
    path('ciudades/<int:pk>/delete/', views.delete_ciudad, name='delete_ciudad'),

    ###MONEDAS###
    path('monedas/', views.list_monedas , name='list_monedas'),
    path('monedas/<int:pk>/', views.get_moneda, name='detail_moneda'),
    path('monedas/<int:pk>/update/', views.put_moneda, name='update_moneda'),
    path('monedas/create/', views.post_moneda, name='create_moneda'),
    path('monedas/<int:pk>/delete/', views.delete_moneda, name='delete_moneda'),

]


