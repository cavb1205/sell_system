from django.urls import path
from . import views


urlpatterns = [
    
    ### RESERVAS ####
    path('', views.list_reservas, name='list_reservas'),
    path('<int:pk>/', views.get_reserva, name='detail_reserva'),
    path('create/', views.post_reserva, name='create_reserva'),
    path('<int:pk>/update/', views.put_reserva, name='update_reserva'),
    path('<int:pk>/delete/', views.delete_reserva, name='delete_reserva'),
]