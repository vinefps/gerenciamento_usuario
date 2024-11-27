# API com FastAPI e JWT

Esta é uma API desenvolvida com **FastAPI**, que utiliza **JWT (JSON Web Token)** para autenticação e autorização. O projeto inclui endpoints protegidos e integração com **Swagger** para documentação interativa.

## Instalação

1. Clone o repositório e navegue até o diretório do projeto.
2. Crie um ambiente virtual para isolar as dependências.
3. Instale as dependências listadas no arquivo `requirements.txt`.

## Rodando a aplicação

1. Inicie o servidor local com o comando apropriado do `uvicorn`.
2. Acesse a interface Swagger UI no navegador (http://127.0.0.1:8000/docs) para interagir com a API.

## Endpoints Principais

### Login (Gerar Token)

- URL: `/auth/login`
- Método: POST
- Descrição: Gera um token JWT ao autenticar o usuário.
- Parâmetros: `email` e `password`.
- Retorno esperado: Um token de acesso e o tipo de token.

### Dados do Usuário Logado

- URL: `/users/users/me`
- Método: GET
- Descrição: Retorna informações do usuário autenticado.
- Header necessário: `Authorization` com o valor `Bearer <access_token>`.

## Como usar o token JWT

1. Realize login no endpoint `/auth/login` para obter o token JWT.
2. Inclua o token no cabeçalho `Authorization` com o prefixo `Bearer` para acessar endpoints protegidos.

## Testando no Postman

1. Configure uma requisição POST para o endpoint de login, fornecendo as credenciais do usuário.
2. Copie o token de acesso retornado na resposta.
3. Configure uma nova requisição GET para o endpoint protegido, adicionando o token ao cabeçalho `Authorization`.

## Erros Comuns

- **401 Unauthorized**: Certifique-se de que o token foi enviado corretamente no cabeçalho.
- **404 Not Found**: Verifique a URL e o método HTTP utilizado.
- **422 Unprocessable Entity**: Verifique se os dados enviados no corpo da requisição estão no formato esperado.

## Ferramentas Utilizadas

- FastAPI para criação da API.
- Uvicorn como servidor ASGI.
- PyJWT para geração e validação de tokens JWT.
- Swagger para documentação interativa.

## Contribuições

Contribuições são bem-vindas! Abra uma issue ou pull request para sugerir melhorias ou corrigir problemas.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
