from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from Recaudos.models import Recaudo
from Recaudos.serializers import RecaudoSerializer


@api_view(['GET'])
def list_recaudos(request):
    '''obtenemos todas las recaudos'''
    recaudos = Recaudo.objects.all()
    if recaudos:
        recaudo_serializer = RecaudoSerializer(recaudos, many=True)
        return Response(recaudo_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado recaudos'}, status=status.HTTP_200_OK)
    
    

@api_view(['GET'])
def get_recaudo(request, pk):
    recaudo = Recaudo.objects.filter(id=pk).first()
    if recaudo:
        recaudo_serializer = RecaudoSerializer(recaudo, many=False)
        return Response(recaudo_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message':'No se encontro el recaudo'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_recaudo(request, pk):
    recaudo = Recaudo.objects.filter(id=pk).first()
    if recaudo:
        recaudo_serializer = RecaudoSerializer(recaudo, data=request.data)
        if recaudo_serializer.is_valid():
            recaudo_serializer.save()
            return Response(recaudo_serializer.data,status=status.HTTP_200_OK)
        return Response(recaudo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró el recaudo'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_recaudo(request):
    '''creamos una recaudo'''
    if request.method == 'POST':
        recaudo_serializer = RecaudoSerializer(data = request.data)
        if recaudo_serializer.is_valid():
            recaudo_serializer.save()
            return Response(recaudo_serializer.data, status=status.HTTP_200_OK)
        return Response(recaudo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_recaudo(request, pk):
    recaudo = Recaudo.objects.filter(id=pk).first()
    if recaudo:
        recaudo.delete()
        return Response({'message':'recaudo eliminado correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró el recaudo'}, status=status.HTTP_400_BAD_REQUEST)

