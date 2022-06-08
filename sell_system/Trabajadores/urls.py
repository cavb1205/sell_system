from django.urls import path
from . import views

urlpatterns = [

    
    ###TIENDA###
    path('', views.list_trabajadores , name='list_trabajadores'),
    path('<int:pk>/', views.get_trabajador, name='detail_trabajador'),
    path('create/', views.post_trabajador, name='create_trabajador'),
    path('<int:pk>/update/', views.put_trabajador, name='update_trabajador'),
    path('<int:pk>/delete/', views.delete_trabajador, name='delete_trabajador'),

   

]


