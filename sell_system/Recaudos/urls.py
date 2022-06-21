from django.urls import path
from . import views


urlpatterns = [
    
    ### RECAUDOS ####
    path('', views.list_recaudos, name='list_recaudos'),
    path('<int:pk>/', views.get_recaudo, name='detail_recaudo'),
    path('create/', views.post_recaudo, name='create_recaudo'),
    path('<int:pk>/update/', views.put_recaudo, name='update_recaudo'),
    path('<int:pk>/delete/', views.delete_recaudo, name='delete_recaudo'),
]