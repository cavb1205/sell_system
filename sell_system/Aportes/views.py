from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *
from .serializers import AporteSerializer


@api_view(['GET','POST'])
def get_aportes(request):
    '''get and post, aportes'''

    if request.method == 'GET':
        aportes = Aporte.objects.all()
        serialize = AporteSerializer(aportes, many=True)
        return Response(serialize.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serialize = AporteSerializer(data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def get_aporte(request, pk):
    '''get a specific aporte'''

    try:
        aporte = Aporte.objects.get(id=pk)
    except Aporte.DoesNotExist:
        return Response({'message': 'Aporte no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serialize = AporteSerializer(aporte, many=False)
        return Response(serialize.data,status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serialize = AporteSerializer(aporte, data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        aporte.delete()
        return Response({'message':'Aporte eliminado correctamente'},status=status.HTTP_200_OK)
        




