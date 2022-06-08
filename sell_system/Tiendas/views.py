
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from Tiendas.models import Ciudad, Moneda, Tienda
from Tiendas.serializers import MonedaSerializer, CiudadSerializer, TiendaSerializer


### VIEWS FOR TIENDA  ####

@api_view(['GET'])
def list_tiendas(request):
    '''obtenemos todas las tiendas'''
    tiendas = Tienda.objects.all()
    if tiendas:
        serializer = TiendaSerializer(tiendas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado tiendas'}, status=status.HTTP_200_OK)
    
    
@api_view(['GET'])
def get_tienda(request, pk):
    tienda = Tienda.objects.filter(id=pk).first()
    print(tienda)
    if tienda:
        serialize = TiendaSerializer(tienda, many=False)
        return Response(serialize.data)
    else:
        return Response({'message':'No se encontró la tienda'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_tienda(request, pk):
    tienda = Tienda.objects.filter(id=pk).first()
    if tienda:
        serialize = TiendaSerializer(tienda, data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró la tienda'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_tienda(request):
    '''creamos una tienda'''
    if request.method == 'POST':
        serialize = TiendaSerializer(data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_tienda(request, pk):
    tienda = Tienda.objects.filter(id=pk).first()
    if tienda:
        tienda.delete()
        return Response({'message':'Tienda eliminada correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró la tienda'}, status=status.HTTP_400_BAD_REQUEST)

### END VIEWS FOR TIENDA  ####


#### VIEWS FOR CIUDAD ####

@api_view(['GET'])
def list_ciudades(request):
    '''list all ciudades'''

    ciudades = Ciudad.objects.all()
    if ciudades:
        serializer = CiudadSerializer(ciudades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se encontraron ciudades'},status=status.HTTP_200_OK)


@api_view(['GET'])
def get_ciudad(request, pk):
    ciudad = Ciudad.objects.filter(id=pk).first()
    if ciudad:
        serialize = CiudadSerializer(ciudad, many=False)
        return Response(serialize.data)
    else:
        return Response({'message':'No se encontró la ciudad'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_ciudad(request, pk):
    ciudad = Ciudad.objects.filter(id=pk).first()
    if ciudad:
        serialize = CiudadSerializer(ciudad, data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró la ciudad'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def post_ciudad(request):
    '''creamos una ciudad'''
    if request.method == 'POST':
        serialize = CiudadSerializer(data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_ciudad(request, pk):
    ciudad = Ciudad.objects.filter(id=pk).first()
    if ciudad:
        ciudad.delete()
        return Response({'message':'Ciudad eliminada correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró la ciudad'}, status=status.HTTP_400_BAD_REQUEST)



#### VIEWS FOR MONEDA ####

@api_view(['GET'])
def list_monedas(request):
    '''list all monedas'''

    monedas = Moneda.objects.all()
    if monedas:
        serializer = MonedaSerializer(monedas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se encontraron monedas'},status=status.HTTP_200_OK)


@api_view(['GET'])
def get_moneda(request, pk):
    moneda = Moneda.objects.filter(id=pk).first()
    if moneda:
        serialize = MonedaSerializer(moneda, many=False)
        return Response(serialize.data)
    else:
        return Response({'message':'No se encontró la moneda'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_moneda(request, pk):
    moneda = Moneda.objects.filter(id=pk).first()
    if moneda:
        serialize = MonedaSerializer(moneda, data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'No se encontró la moneda'}, status=status.HTTP_400_BAD_REQUEST)
      
        
@api_view(['POST'])
def post_moneda(request):
    '''creamos una moneda'''
    if request.method == 'POST':
        serialize = MonedaSerializer(data = request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_200_OK)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_moneda(request, pk):
    moneda = Moneda.objects.filter(id=pk).first()
    if moneda:
        moneda.delete()
        return Response({'message':'Moneda eliminada correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró la moneda'}, status=status.HTTP_400_BAD_REQUEST)

