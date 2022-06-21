from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from Ventas.models import Venta
from Ventas.serializers import VentaSerializer




@api_view(['GET'])
def list_ventas(request):
    '''obtenemos todas las ventas'''
    ventas = Venta.objects.all()
    if ventas:
        venta_serializer = VentaSerializer(ventas, many=True)
        return Response(venta_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado ventas'}, status=status.HTTP_200_OK)
    
    

@api_view(['GET'])
def get_venta(request, pk):
    venta = Venta.objects.filter(id=pk).first()
    if venta:
        venta_serializer = VentaSerializer(venta, many=False)
        return Response(venta_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message':'No se encontro la venta'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_venta(request, pk):
    venta = Venta.objects.filter(id=pk).first()
    if venta:
        venta_serializer = VentaSerializer(venta, data=request.data)
        if venta_serializer.is_valid():
            venta_serializer.save()
            return Response(venta_serializer.data,status=status.HTTP_200_OK)
        return Response(venta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró la venta'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_venta(request):
    '''creamos una venta'''
    if request.method == 'POST':
        venta_serializer = VentaSerializer(data = request.data)
        if venta_serializer.is_valid():
            venta_serializer.save()
            return Response(venta_serializer.data, status=status.HTTP_200_OK)
        return Response(venta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_venta(request, pk):
    venta = Venta.objects.filter(id=pk).first()
    if venta:
        venta.delete()
        return Response({'message':'venta eliminada correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró la venta'}, status=status.HTTP_400_BAD_REQUEST)
