
from rest_framework import serializers
from .models import Tienda, Moneda, Ciudad


class CiudadSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ciudad
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id':instance.id,
            'nombre':instance.nombre
        }


class MonedaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Moneda
        fields = '__all__'



class TiendaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tienda
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id':instance.id,
            'nombre':instance.nombre,
            'ciudad':instance.ciudad.nombre,
            'telefono':instance.telefono,
            'moneda':{
                'nombre':instance.moneda.nombre,
                'codigo':instance.moneda.codigo,
            },
            'fecha_registro': instance.fecha_registro,
            'administrador':instance.administrador.first_name,
            'caja':instance.caja_inicial,
            'estado': instance.estado,

        }

