from django.contrib.auth import authenticate

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User
from Trabajadores.models import Perfil

from Trabajadores.serializers import UserCreateSerializer, PerfilSerializer, UserSerializer, UserUpdateSerializer
from Trabajadores.serializers import UserTokenLoginObtainSerializer,UserLoginSerializer
from Tiendas.models import Tienda

##### LOGIN #####

class Login(TokenObtainPairView):
    serializer_class = UserTokenLoginObtainSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username','')
        password = request.data.get('password','')
        user = authenticate(
            username=username,
            password=password
        )

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                user_serializer = UserLoginSerializer(user)
                return Response({
                    'token': login_serializer.validated_data['access'],
                    'refresh': login_serializer.validated_data['refresh'],
                    'user': user_serializer.data,
                    'message': 'Inicio de sesión exitoso.'
                }, status=status.HTTP_200_OK)
            return Response({'error':'Usuario o contraseña incorrectos.'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'Usuario o contraseña incorrectos.'},status=status.HTTP_400_BAD_REQUEST)

   



#### CRUD TRABAJADORES #####

@api_view(['GET'])
def list_trabajadores(request):
    tienda = Tienda.objects.filter(id=request.user.perfil.tienda.id).first()
    
    trabajadores = Perfil.objects.filter(tienda=tienda.id)
    if trabajadores:
        trabajadores_serializer = PerfilSerializer(trabajadores, many = True)
        return Response(trabajadores_serializer.data, status=status.HTTP_200_OK)
    return Response({'message':'No se han creado trabajadores'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_trabajador(request, pk):
    trabajador = Perfil.objects.filter(id=pk).first()
    if trabajador:
        user_id = trabajador.trabajador.id
        user = User.objects.filter(id=user_id).first()
        trabajador_serializer = PerfilSerializer(trabajador, many=False)
        user_serializer = UserSerializer(user, many=False)
        
        return Response(
            {
                'id':trabajador_serializer.data['id'],
                'username': user_serializer.data['username'],
                'identificacion': trabajador_serializer.data['identificacion'],
                'first_name': user_serializer.data['first_name'],
                'last_name': user_serializer.data['last_name'],
                'email':user_serializer.data['email'],
                'telefono': trabajador_serializer.data['telefono'],
                'direccion': trabajador_serializer.data['direccion'],
                'is_active':user_serializer.data['is_active'],
                'last_login':user_serializer.data['last_login'],
                'date_joined':user_serializer.data['date_joined'],
                'tienda': trabajador_serializer.data['tienda'],
        })
    else:
        return Response({'message':'No se encontró el trabajador'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def put_trabajador(request, pk):
    trabajador = Perfil.objects.filter(id=pk).first()
    if trabajador:
        user = User.objects.filter(id=trabajador.trabajador.id).first()
        user_data = {
            "username":request.data['username'],
            "first_name":request.data['first_name'],
            "last_name":request.data['last_name'],
            "is_active":request.data['is_active']
        }
        trabajador_data = {
        'trabajador':user.id,
        'identificacion':request.data['identificacion'],
        'telefono':request.data['telefono'],
        'direccion':request.data['direccion'],
        'tienda':request.data['tienda']
        }
        user_serializer = UserUpdateSerializer(user, data=user_data)
        trabajador_serializer = PerfilSerializer(trabajador, data=trabajador_data)
        
        if trabajador_serializer.is_valid() and user_serializer.is_valid():
            user_serializer.save()
            trabajador_serializer.save()
            return Response(trabajador_serializer.data,status=status.HTTP_200_OK)
        return Response(trabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message':'Trabajador no existe'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def post_trabajador(request):
    
    user_data = {
        "username":request.data['username'],
        "first_name":request.data['first_name'],
        "last_name":request.data['last_name'],
        "password":request.data['password']
    }
    
    user_serializer = UserCreateSerializer(data = user_data)
    
    if user_serializer.is_valid():
        user = user_serializer.save()
        user.set_password(request.data['password'])
        user.save()

        trabajador_data = {
        'trabajador':user.id,
        'identificacion':request.data['identificacion'],
        'telefono':request.data['telefono'],
        'direccion':request.data['direccion'],
        'tienda': request.user.perfil.tienda.id
    }
        trabajador_serializer = PerfilSerializer(data = trabajador_data)
        if trabajador_serializer.is_valid():
            trabajador_serializer.save()

            return Response(trabajador_serializer.data,status=status.HTTP_200_OK)
    return Response(user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def delete_trabajador(request, pk):
    trabajador = Perfil.objects.filter(id=pk).first()
    if trabajador:
        user = User.objects.filter(id=trabajador.trabajador.id).first()
        trabajador.delete()
        user.delete()
        return Response({'message':'Trabajador eliminado correctamente'},status=status.HTTP_200_OK)
    return Response({'message':'No se encontró el trabajador'}, status=status.HTTP_400_BAD_REQUEST)
