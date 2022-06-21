from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from Clientes.models import Cliente

from Clientes.serializers import ClienteSerializer, ClienteCreateSerializer


@api_view(['GET'])
def list_clientes(request):
    '''obtenemos todos los clientes'''
    clientes = Cliente.objects.all()
    if clientes:
        clientes_serializer = ClienteSerializer(clientes, many=True)
        return Response(clientes_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado clientes'}, status=status.HTTP_200_OK)
    


@api_view(['GET'])
def get_cliente(request, pk):
    cliente = Cliente.objects.filter(id=pk).first()
    if cliente:
        cliente_serializer = ClienteSerializer(cliente, many=False)
        return Response(cliente_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message':'No se encontró el cliente'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def post_cliente(request):
    '''creamos un cliente'''
    if request.method == 'POST':
        cliente_serializer = ClienteCreateSerializer(data = request.data)
        if cliente_serializer.is_valid():
            cliente_serializer.save()
            return Response(cliente_serializer.data, status=status.HTTP_200_OK)
        return Response(cliente_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['PUT'])
def put_cliente(request, pk):
    cliente = Cliente.objects.filter(id=pk).first()
    if cliente:
        cliente_serializer = ClienteSerializer(cliente, data=request.data)
        if cliente_serializer.is_valid():
            cliente_serializer.save()
            return Response(cliente_serializer.data,status=status.HTTP_200_OK)
        return Response(cliente_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No existe el cliente'}, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['DELETE'])
def delete_cliente(request, pk):
    cliente = Cliente.objects.filter(id=pk).first()
    if cliente:
        cliente.delete()
        return Response({'message':'Cliente eliminado correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'Cliente no existe!'}, status=status.HTTP_400_BAD_REQUEST)
