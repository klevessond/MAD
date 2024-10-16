# NutriApp - Aplicativo de Nutrição

Este projeto é um aplicativo de nutrição que utiliza Django no backend e React no frontend. O aplicativo permite dois tipos de usuários: Nutricionistas e Usuários Comuns, oferecendo funcionalidades específicas para cada tipo.

## Funcionalidades Principais

### Para Nutricionistas:
- Criar e gerenciar conteúdos relacionados à nutrição (receitas, informações sobre alimentos, artigos de saúde)
- Criar planos de alimentação comunitários
- Gerenciar seguidores

### Para Usuários Comuns:
- Acessar conteúdos publicados pelos nutricionistas
- Criar planos de alimentação pessoais
- Comentar em publicações
- Publicar textos curtos com fotos relacionados a alimentos e receitas
- Salvar publicações favoritas
- Replicar e marcar como concluídas refeições dos planos de alimentação

### Sistema de Pontuação:
- Usuários ganham pontos por interações no aplicativo

## Tecnologias Utilizadas

### Backend (Django):
- Django REST Framework para criação de API
- Autenticação baseada em token
- Modelos personalizados para usuários (Nutricionistas e Usuários Comuns)
- Views e serializers para gerenciamento de usuários, receitas e outras funcionalidades

### Frontend (React):
- React Router para navegação
- Axios para requisições HTTP
- Componentes para login, registro e página inicial

## Estrutura do Projeto

### Backend:
- `nutriapp_backend/`: Projeto Django principal
  - `core/`: Aplicativo principal
    - `models.py`: Definição dos modelos de dados
    - `views.py`: Lógica de negócios e endpoints da API
    - `serializers.py`: Serialização de dados
    - `urls.py`: Configuração de rotas da API

### Frontend:
- `src/`:
  - `components/`: Componentes React (Login, Register, Home)
  - `App.js`: Componente principal e configuração de rotas

## Configuração e Execução

### Backend:
1. Crie um ambiente virtual: `python -m venv venv`
2. Ative o ambiente virtual: `source venv/bin/activate` (Linux/Mac) ou `venv\Scripts\activate` (Windows)
3. Instale as dependências: `pip install -r requirements.txt`
4. Execute as migrações: `python manage.py migrate`
5. Inicie o servidor: `python manage.py runserver`

### Frontend:
1. Instale as dependências: `npm install`
2. Inicie o aplicativo React: `npm start`

## Próximos Passos
- Implementar funcionalidades específicas para nutricionistas
- Desenvolver sistema de pontuação
- Melhorar a interface do usuário
- Implementar testes automatizados
- Configurar deploy para produção
