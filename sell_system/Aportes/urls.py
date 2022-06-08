from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_aportes, name='get_aportes'),
    path('<int:pk>/', views.get_aporte, name='get_aporte'),
]