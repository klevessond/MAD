from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('nutricionista', 'Nutricionista'),
        ('comum', 'Usuário Comum'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    bio = models.TextField(blank=True)
    registration_number = models.CharField(max_length=50, blank=True)
    specialization = models.CharField(max_length=100, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)

    def is_nutricionista(self):
        return self.user_type == 'nutricionista'

class CategoriaReceita(models.Model):
    nome = models.CharField(max_length=255)

# Outros modelos (exemplo)
class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

# Adicione outros modelos conforme necessário


class Receita(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    modo_preparo = models.TextField()
    tempo_preparo = models.IntegerField()
    dificuldade = models.CharField(max_length=20)
    categoria = models.ForeignKey(CategoriaReceita, on_delete=models.CASCADE)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    data_publicacao = models.DateTimeField(auto_now_add=True)

class ImagemReceita(models.Model):
    receita = models.ForeignKey(Receita, on_delete=models.CASCADE)
    url_imagem = models.CharField(max_length=255)

class ReceitaFavorita(models.Model):
    receita = models.ForeignKey(Receita, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    data_adicionado = models.DateTimeField(auto_now_add=True)

class CategoriaArtigo(models.Model):
    nome = models.CharField(max_length=255)

class Artigo(models.Model):
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    data_publicacao = models.DateTimeField(auto_now_add=True)
    categoria = models.ForeignKey(CategoriaArtigo, on_delete=models.CASCADE)

class ImagemArtigo(models.Model):
    artigo = models.ForeignKey(Artigo, on_delete=models.CASCADE)
    url_imagem = models.CharField(max_length=255)

class ArtigoFavorito(models.Model):
    artigo = models.ForeignKey(Artigo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    data_adicionado = models.DateTimeField(auto_now_add=True)

class PlanoAlimentar(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    data_criacao = models.DateTimeField(auto_now_add=True)
    publico = models.BooleanField(default=False)

class SeguidorPlano(models.Model):
    plano = models.ForeignKey(PlanoAlimentar, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    data_seguimento = models.DateTimeField(auto_now_add=True)

class Refeicao(models.Model):
    TIPO_CHOICES = (
        ('cafe_da_manha', 'Café da Manhã'),
        ('lanche_da_manha', 'Lanche da Manhã'),
        ('almoco', 'Almoço'),
        ('lanche_da_tarde', 'Lanche da Tarde'),
        ('janta', 'Janta'),
        ('ceia', 'Ceia'),
    )
    plano = models.ForeignKey(PlanoAlimentar, on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    horario = models.TimeField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    receita = models.ForeignKey(Receita, on_delete=models.CASCADE)


class PostagemUsuario(models.Model):
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    conteudo = models.TextField()
    imagem = models.CharField(max_length=255, null=True, blank=True)
    data_publicacao = models.DateTimeField(auto_now_add=True)
    refeicao = models.ForeignKey(Refeicao, on_delete=models.SET_NULL, null=True, blank=True)

class ComentarioPlano(models.Model):
    plano = models.ForeignKey(PlanoAlimentar, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)

class ComentarioArtigo(models.Model):
    artigo = models.ForeignKey(Artigo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)

class ComentarioReceita(models.Model):
    receita = models.ForeignKey(Receita, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)

class ComentarioRefeicao(models.Model):
    refeicao = models.ForeignKey(Refeicao, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)

class ComentarioPostagem(models.Model):
    postagem = models.ForeignKey(PostagemUsuario, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)