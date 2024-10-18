from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import (Recipe,  CategoriaReceita, Receita, ImagemReceita, ReceitaFavorita,
    CategoriaArtigo, Artigo, ImagemArtigo, ArtigoFavorito,
    PlanoAlimentar, SeguidorPlano, Refeicao, PostagemUsuario,
    ComentarioPlano, ComentarioArtigo, ComentarioReceita,
    ComentarioRefeicao, ComentarioPostagem
)

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'user_type', 'bio','registration_number', 'specialization', 'height', 'weight')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return {'user': user}
        raise serializers.ValidationError("Credenciais inválidas.")
    
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'author', 'created_at']
        read_only_fields = ['author', 'created_at']

class CategoriaReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaReceita
        fields = '__all__'

class ReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receita
        fields = ['id', 'titulo', 'descricao', 'modo_preparo', 'tempo_preparo', 'dificuldade', 'categoria', 'autor']
        read_only_fields = ['autor']

    def create(self, validated_data):
        validated_data['autor'] = self.context['request'].user
        return super().create(validated_data)

class ImagemReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemReceita
        fields = '__all__'

class ReceitaFavoritaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceitaFavorita
        fields = '__all__'

class CategoriaArtigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaArtigo
        fields = '__all__'

class ArtigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artigo
        fields = ['id', 'titulo', 'conteudo', 'categoria', 'autor', 'data_publicacao']
        read_only_fields = ['autor', 'data_publicacao']

    def create(self, validated_data):
        validated_data['autor'] = self.context['request'].user
        return super().create(validated_data)

class ImagemArtigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemArtigo
        fields = '__all__'

class ArtigoFavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtigoFavorito
        fields = '__all__'

class PlanoAlimentarSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanoAlimentar
        fields = '__all__'

class SeguidorPlanoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguidorPlano
        fields = '__all__'

class RefeicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refeicao
        fields = '__all__'

class PostagemUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostagemUsuario
        fields = '__all__'

class ComentarioPlanoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComentarioPlano
        fields = '__all__'

class ComentarioArtigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComentarioArtigo
        fields = '__all__'

class ComentarioReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComentarioReceita
        fields = '__all__'

class ComentarioRefeicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComentarioRefeicao
        fields = '__all__'

class ComentarioPostagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComentarioPostagem
        fields = '__all__'
