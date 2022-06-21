from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *
from .serializers import GastoSerializer, TipoGastoSerializer




####### TIPO GASTOS ######
@api_view(['GET'])
def list_tipo_gastos(request):
    '''obtenemos todos los tipo_gastos'''
    tipo_gastos = Tipo_Gasto.objects.all()
    if tipo_gastos:
        tipo_gasto_serializer = TipoGastoSerializer(tipo_gastos, many=True)
        return Response(tipo_gasto_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado tipos de gastos'}, status=status.HTTP_200_OK)
    
    

@api_view(['GET'])
def get_tipo_gasto(request, pk):
    tipo_gasto = Tipo_Gasto.objects.filter(id=pk).first()
    if tipo_gasto:
        tipo_gasto_serializer = TipoGastoSerializer(tipo_gasto, many=False)
        return Response(tipo_gasto_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message':'No se encontro el tipo de gasto'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_tipo_gasto(request, pk):
    tipo_gasto = Tipo_Gasto.objects.filter(id=pk).first()
    if tipo_gasto:
        tipo_gasto_serializer = TipoGastoSerializer(tipo_gasto, data=request.data)
        if tipo_gasto_serializer.is_valid():
            tipo_gasto_serializer.save()
            return Response(tipo_gasto_serializer.data,status=status.HTTP_200_OK)
        return Response(tipo_gasto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró el tipo de gasto'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_tipo_gasto(request):
    '''creamos un tipo_gasto'''
    if request.method == 'POST':
        tipo_gasto_serializer = TipoGastoSerializer(data = request.data)
        if tipo_gasto_serializer.is_valid():
            tipo_gasto_serializer.save()
            return Response(tipo_gasto_serializer.data, status=status.HTTP_200_OK)
        return Response(tipo_gasto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_tipo_gasto(request, pk):
    tipo_gasto = Tipo_Gasto.objects.filter(id=pk).first()
    if tipo_gasto:
        tipo_gasto.delete()
        return Response({'message':'tipo de gasto eliminado correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró el tipo de gasto'}, status=status.HTTP_400_BAD_REQUEST)



######## GASTOS ######

@api_view(['GET'])
def list_gastos(request):
    '''obtenemos todos los gastos'''
    gastos = Gasto.objects.all()
    if gastos:
        gasto_serializer = GastoSerializer(gastos, many=True)
        return Response(gasto_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado gastos'}, status=status.HTTP_200_OK)
    
    

@api_view(['GET'])
def get_gasto(request, pk):
    gasto = Gasto.objects.filter(id=pk).first()
    if gasto:
        gasto_serializer = GastoSerializer(gasto, many=False)
        return Response(gasto_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message':'No se encontro el gasto'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_gasto(request, pk):
    gasto = Gasto.objects.filter(id=pk).first()
    if gasto:
        gasto_serializer = GastoSerializer(gasto, data=request.data)
        if gasto_serializer.is_valid():
            gasto_serializer.save()
            return Response(gasto_serializer.data,status=status.HTTP_200_OK)
        return Response(gasto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró el gasto'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_gasto(request):
    '''creamos un gasto'''
    if request.method == 'POST':
        gasto_serializer = GastoSerializer(data = request.data)
        if gasto_serializer.is_valid():
            gasto_serializer.save()
            return Response(gasto_serializer.data, status=status.HTTP_200_OK)
        return Response(gasto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_gasto(request, pk):
    gasto = Gasto.objects.filter(id=pk).first()
    if gasto:
        gasto.delete()
        return Response({'message':'gasto eliminado correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró el gasto'}, status=status.HTTP_400_BAD_REQUEST)
