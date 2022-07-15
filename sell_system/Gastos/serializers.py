
from rest_framework.serializers import ModelSerializer
from Gastos.models import Gasto, Tipo_Gasto



class TipoGastoSerializer(ModelSerializer):
    class Meta:
        model = Tipo_Gasto
        fields = '__all__'


class GastoSerializer(ModelSerializer):
    class Meta:
        model = Gasto
        fields = '__all__'
    
    def to_representation(self,instance):
        return{
            "id":instance.id,
            "fecha":instance.fecha,
            "valor":instance.valor,
            "comentario":instance.comentario,
            "tipo_gasto":instance.tipo_gasto.id,
            # {
            #     'id':instance.tipo_gasto.id,
            #     'tipo_gasto':instance.tipo_gasto.tipo_gasto,
            # },
            "trabajador":instance.trabajador.trabajador.first_name,
            "tienda":instance.tienda.id,

        }


class GastoUpdateSerializer(ModelSerializer):
    class Meta:
        model = Gasto
        exclude =['tienda','trabajador']