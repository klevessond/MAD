from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( RegisterView, LoginView, RecipeViewSet, UserView,CategoriaReceitaViewSet, ReceitaViewSet,
    ImagemReceitaViewSet, ReceitaFavoritaViewSet,
    CategoriaArtigoViewSet, ArtigoViewSet, ImagemArtigoViewSet,
    ArtigoFavoritoViewSet, PlanoAlimentarViewSet, SeguidorPlanoViewSet,
    RefeicaoViewSet , PostagemUsuarioViewSet,
    ComentarioPlanoViewSet, ComentarioArtigoViewSet,
    ComentarioReceitaViewSet, ComentarioRefeicaoViewSet,
    ComentarioPostagemViewSet
)

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)
router.register(r'categorias-receitas', CategoriaReceitaViewSet)
router.register(r'receitas', ReceitaViewSet)
router.register(r'imagens-receitas', ImagemReceitaViewSet)
router.register(r'receitas-favoritas', ReceitaFavoritaViewSet)
router.register(r'categorias-artigos', CategoriaArtigoViewSet)
router.register(r'artigos', ArtigoViewSet)
router.register(r'imagens-artigos', ImagemArtigoViewSet)
router.register(r'artigos-favoritos', ArtigoFavoritoViewSet)
router.register(r'planos-alimentares', PlanoAlimentarViewSet)
router.register(r'seguidores-planos', SeguidorPlanoViewSet)
router.register(r'refeicoes', RefeicaoViewSet)
router.register(r'postagens-usuarios', PostagemUsuarioViewSet)
router.register(r'comentarios-planos', ComentarioPlanoViewSet)
router.register(r'comentarios-artigos', ComentarioArtigoViewSet)
router.register(r'comentarios-receitas', ComentarioReceitaViewSet)
router.register(r'comentarios-refeicoes', ComentarioRefeicaoViewSet)
router.register(r'comentarios-postagens', ComentarioPostagemViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('', include(router.urls)),
]
