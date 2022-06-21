from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from Utilidades.models import Utilidad
from Utilidades.serializers import UtilidadSerializer



@api_view(['GET'])
def list_utilidades(request):
    '''obtenemos todas las utilidads'''
    utilidades = Utilidad.objects.all()
    if utilidades:
        utilidad_serializer = UtilidadSerializer(utilidades, many=True)
        return Response(utilidad_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado utilidades'}, status=status.HTTP_200_OK)
    
    

@api_view(['GET'])
def get_utilidad(request, pk):
    utilidad = Utilidad.objects.filter(id=pk).first()
    if utilidad:
        utilidad_serializer = UtilidadSerializer(utilidad, many=False)
        return Response(utilidad_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message':'No se encontro la utilidad'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_utilidad(request, pk):
    utilidad = Utilidad.objects.filter(id=pk).first()
    if utilidad:
        utilidad_serializer = UtilidadSerializer(utilidad, data=request.data)
        if utilidad_serializer.is_valid():
            utilidad_serializer.save()
            return Response(utilidad_serializer.data,status=status.HTTP_200_OK)
        return Response(utilidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró la utilidad'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_utilidad(request):
    '''creamos una utilidad'''
    if request.method == 'POST':
        utilidad_serializer = UtilidadSerializer(data = request.data)
        if utilidad_serializer.is_valid():
            utilidad_serializer.save()
            return Response(utilidad_serializer.data, status=status.HTTP_200_OK)
        return Response(utilidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_utilidad(request, pk):
    utilidad = Utilidad.objects.filter(id=pk).first()
    if utilidad:
        utilidad.delete()
        return Response({'message':'Utilidad eliminada correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró la utilidad'}, status=status.HTTP_400_BAD_REQUEST)
