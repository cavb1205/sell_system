
from rest_framework.serializers import ModelSerializer

from Reservas.models import Reserva


class ReservaSerializer(ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'
