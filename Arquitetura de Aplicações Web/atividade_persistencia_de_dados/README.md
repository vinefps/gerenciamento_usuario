# Sistema de Cadastro de Pessoas

Este é um sistema desenvolvido utilizando **Flask** e **MySQL** para o cadastro e gerenciamento de pessoas físicas e jurídicas. O sistema permite a criação, leitura, atualização e exclusão de registros, tanto para pessoas físicas quanto jurídicas. Ele armazena os dados em um banco de dados MySQL.

## Funcionalidades

- **Cadastro de Pessoa Física**: Permite o cadastro de uma pessoa física, incluindo informações como nome, endereço, e-mail, senha, CPF e data de nascimento.
- **Cadastro de Pessoa Jurídica**: Permite o cadastro de uma pessoa jurídica, incluindo informações como nome, endereço, e-mail, senha, CNPJ, razão social e nome fantasia.
- **Listar Pessoas**: Permite listar todas as pessoas cadastradas no sistema.
- **Obter Pessoa por ID**: Permite obter os dados de uma pessoa específica por seu ID.
- **Atualizar Pessoa**: Permite atualizar os dados de uma pessoa existente.
- **Deletar Pessoa**: Permite excluir uma pessoa (física ou jurídica) do sistema.

## Arquitetura do Sistema

O sistema utiliza uma **API RESTful** desenvolvida com Flask. Ele interage com um banco de dados MySQL, onde os dados são armazenados nas seguintes tabelas:

- **Pessoa**: Contém as informações básicas de todas as pessoas, como nome e endereço.
- **Usuario**: Relaciona uma pessoa a um usuário, com e-mail e senha.
- **PessoaFisica**: Contém dados específicos de uma pessoa física, como CPF e data de nascimento.
- **PessoaJuridica**: Contém dados específicos de uma pessoa jurídica, como CNPJ, razão social e nome fantasia.

## Banco de Dados

O banco de dados utilizado é o **MySQL**. O sistema exige a criação das seguintes tabelas:

- **Pessoa**: Armazena informações gerais de cada pessoa.
- **Usuario**: Relaciona as pessoas a um usuário.
- **PessoaFisica**: Armazena os dados de pessoas físicas.
- **PessoaJuridica**: Armazena os dados de pessoas jurídicas.

## Como Configurar o Sistema

### Requisitos

- **Python 3.x**
- **Flask**
- **MySQL**
- **mysql-connector-python**

### Instalação

1. Instale as dependências utilizando o **pip**:

2. Crie um banco de dados MySQL chamado `sistema_usuarios` e configure as tabelas necessárias conforme a estrutura fornecida no projeto.

3. Configure o acesso ao banco de dados no código (definido na função `get_db_connection()`), ajustando o host, usuário e senha conforme a sua configuração do MySQL.

### Execução

1. Execute o servidor Flask com o comando:

O servidor será executado localmente na URL `http://127.0.0.1:5000`.

## Endpoints da API

### `/cadastro_pessoa_fisica` (POST)
Endpoint para cadastrar uma pessoa física.

### `/cadastro_pessoa_juridica` (POST)
Endpoint para cadastrar uma pessoa jurídica.

### `/pessoas` (GET)
Endpoint para listar todas as pessoas cadastradas.

### `/pessoa/<id>` (GET)
Endpoint para obter os dados de uma pessoa específica, usando seu ID.

### `/pessoa/<id>` (PUT)
Endpoint para atualizar os dados de uma pessoa específica.

### `/pessoa/<id>` (DELETE)
Endpoint para deletar uma pessoa específica, com base no seu ID.

## Observações

- A API é configurada para rodar em modo de desenvolvimento, com depuração ativada.
- O banco de dados MySQL deve ser configurado corretamente para garantir que as tabelas sejam criadas e utilizadas conforme o esperado.

Este é um sistema simples e extensível para cadastro de pessoas físicas e jurídicas, podendo ser adaptado conforme as necessidades do projeto.
