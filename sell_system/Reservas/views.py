from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from Reservas.models import Reserva
from Reservas.serializers import ReservaSerializer



@api_view(['GET'])
def list_reservas(request):
    '''obtenemos todas las reservas'''
    reservas = Reserva.objects.all()
    if reservas:
        reserva_serializer = ReservaSerializer(reservas, many=True)
        return Response(reserva_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado reservas'}, status=status.HTTP_200_OK)
    
    

@api_view(['GET'])
def get_reserva(request, pk):
    reserva = Reserva.objects.filter(id=pk).first()
    if reserva:
        reserva_serializer = ReservaSerializer(reserva, many=False)
        return Response(reserva_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message':'No se encontro la reserva'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_reserva(request, pk):
    reserva = Reserva.objects.filter(id=pk).first()
    if reserva:
        reserva_serializer = ReservaSerializer(reserva, data=request.data)
        if reserva_serializer.is_valid():
            reserva_serializer.save()
            return Response(reserva_serializer.data,status=status.HTTP_200_OK)
        return Response(reserva_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró la reserva'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_reserva(request):
    '''creamos una reserva'''
    if request.method == 'POST':
        reserva_serializer = ReservaSerializer(data = request.data)
        if reserva_serializer.is_valid():
            reserva_serializer.save()
            return Response(reserva_serializer.data, status=status.HTTP_200_OK)
        return Response(reserva_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_reserva(request, pk):
    reserva = Reserva.objects.filter(id=pk).first()
    if reserva:
        reserva.delete()
        return Response({'message':'reserva eliminada correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró la reserva'}, status=status.HTTP_400_BAD_REQUEST)
