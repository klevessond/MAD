from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('nutricionista', 'Nutricionista'),
        ('comum', 'Usuário Comum'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    bio = models.TextField(blank=True)
    
    # Campos adicionais para nutricionistas
    registration_number = models.CharField(max_length=50, blank=True)
    specialization = models.CharField(max_length=100, blank=True)

    # Campos adicionais para usuários comuns
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)

    def is_nutricionista(self):
        return self.user_type == 'nutricionista'

# Outros modelos (exemplo)
class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

# Adicione outros modelos conforme necessário