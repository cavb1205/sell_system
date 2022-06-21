from rest_framework.serializers import ModelSerializer

from Utilidades.models import Utilidad


class UtilidadSerializer(ModelSerializer):
    class Meta:
        model = Utilidad
        fields = '__all__'

