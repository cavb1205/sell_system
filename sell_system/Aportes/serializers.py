
from .models import *
from rest_framework.serializers import ModelSerializer


class AporteSerializer(ModelSerializer):
    class Meta:
        model = Aporte
        fields = '__all__'