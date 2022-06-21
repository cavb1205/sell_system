from rest_framework.serializers import ModelSerializer

from Ventas.models import Venta


class VentaSerializer(ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'