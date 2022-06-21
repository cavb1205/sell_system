from rest_framework.serializers import ModelSerializer

from Recaudos.models import Recaudo

class RecaudoSerializer(ModelSerializer):
    class Meta:
        model = Recaudo
        fields = '__all__'