from rest_framework import generics, permissions,viewsets
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import (Recipe,User, CategoriaReceita, Receita, ImagemReceita, ReceitaFavorita,
    CategoriaArtigo, Artigo, ImagemArtigo, ArtigoFavorito,
    PlanoAlimentar, SeguidorPlano, Refeicao,  PostagemUsuario,
    ComentarioPlano, ComentarioArtigo, ComentarioReceita,
    ComentarioRefeicao, ComentarioPostagem
)
from .serializers import (UserSerializer, LoginSerializer,RecipeSerializer,CategoriaReceitaSerializer, ReceitaSerializer,
    ImagemReceitaSerializer, ReceitaFavoritaSerializer,
    CategoriaArtigoSerializer, ArtigoSerializer, ImagemArtigoSerializer,
    ArtigoFavoritoSerializer, PlanoAlimentarSerializer, SeguidorPlanoSerializer,
    RefeicaoSerializer, PostagemUsuarioSerializer,
    ComentarioPlanoSerializer, ComentarioArtigoSerializer,
    ComentarioReceitaSerializer, ComentarioRefeicaoSerializer,
    ComentarioPostagemSerializer
)


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user_type': user.user_type
        })
    
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class CategoriaReceitaViewSet(viewsets.ModelViewSet):
    queryset = CategoriaReceita.objects.all()
    serializer_class = CategoriaReceitaSerializer
    permission_classes = [IsAuthenticated]

class ReceitaViewSet(viewsets.ModelViewSet):
    queryset = Receita.objects.all()
    serializer_class = ReceitaSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        print("Dados recebidos:", request.data)
        return super().create(request, *args, **kwargs)

class ImagemReceitaViewSet(viewsets.ModelViewSet):
    queryset = ImagemReceita.objects.all()
    serializer_class = ImagemReceitaSerializer
    permission_classes = [IsAuthenticated]

class ReceitaFavoritaViewSet(viewsets.ModelViewSet):
    queryset = ReceitaFavorita.objects.all()
    serializer_class = ReceitaFavoritaSerializer
    permission_classes = [IsAuthenticated]

class CategoriaArtigoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaArtigo.objects.all()
    serializer_class = CategoriaArtigoSerializer
    permission_classes = [IsAuthenticated]

class ArtigoViewSet(viewsets.ModelViewSet):
    queryset = Artigo.objects.all()
    serializer_class = ArtigoSerializer
    permission_classes = [IsAuthenticated]

class ImagemArtigoViewSet(viewsets.ModelViewSet):
    queryset = ImagemArtigo.objects.all()
    serializer_class = ImagemArtigoSerializer
    permission_classes = [IsAuthenticated]

class ArtigoFavoritoViewSet(viewsets.ModelViewSet):
    queryset = ArtigoFavorito.objects.all()
    serializer_class = ArtigoFavoritoSerializer
    permission_classes = [IsAuthenticated]

class PlanoAlimentarViewSet(viewsets.ModelViewSet):
    queryset = PlanoAlimentar.objects.all()
    serializer_class = PlanoAlimentarSerializer
    permission_classes = [IsAuthenticated]

class SeguidorPlanoViewSet(viewsets.ModelViewSet):
    queryset = SeguidorPlano.objects.all()
    serializer_class = SeguidorPlanoSerializer
    permission_classes = [IsAuthenticated]

class RefeicaoViewSet(viewsets.ModelViewSet):
    queryset = Refeicao.objects.all()
    serializer_class = RefeicaoSerializer
    permission_classes = [IsAuthenticated]

class PostagemUsuarioViewSet(viewsets.ModelViewSet):
    queryset = PostagemUsuario.objects.all()
    serializer_class = PostagemUsuarioSerializer
    permission_classes = [IsAuthenticated]

class ComentarioPlanoViewSet(viewsets.ModelViewSet):
    queryset = ComentarioPlano.objects.all()
    serializer_class = ComentarioPlanoSerializer
    permission_classes = [IsAuthenticated]

class ComentarioArtigoViewSet(viewsets.ModelViewSet):
    queryset = ComentarioArtigo.objects.all()
    serializer_class = ComentarioArtigoSerializer
    permission_classes = [IsAuthenticated]

class ComentarioReceitaViewSet(viewsets.ModelViewSet):
    queryset = ComentarioReceita.objects.all()
    serializer_class = ComentarioReceitaSerializer
    permission_classes = [IsAuthenticated]

class ComentarioRefeicaoViewSet(viewsets.ModelViewSet):
    queryset = ComentarioRefeicao.objects.all()
    serializer_class = ComentarioRefeicaoSerializer
    permission_classes = [IsAuthenticated]

class ComentarioPostagemViewSet(viewsets.ModelViewSet):
    queryset = ComentarioPostagem.objects.all()
    serializer_class = ComentarioPostagemSerializer
    permission_classes = [IsAuthenticated]
