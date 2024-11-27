import unittest
from app import app
import mysql.connector
from mysql.connector import Error

class TestSistemaUsuarios(unittest.TestCase):

    def setUp(self):
        """Configurações para o início de cada teste"""
        self.app = app.test_client()  # Cria um cliente para fazer as requisições
        self.app.testing = True

        # Configuração do banco de dados de teste (usar um banco separado para testes)
        self.db_connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='0204Mis*',
        )
        self.db_cursor = self.db_connection.cursor()

        # Criar o banco de dados de teste, se não existir
        self.db_cursor.execute('CREATE DATABASE IF NOT EXISTS sistema_usuarios_test;')
        self.db_connection.database = 'sistema_usuarios_test'

        # Criar as tabelas no banco de dados de teste
        self.db_cursor.execute('''CREATE TABLE IF NOT EXISTS Pessoa (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    nome VARCHAR(100),
                                    endereco VARCHAR(255)
                                );''')
        self.db_cursor.execute('''CREATE TABLE IF NOT EXISTS Usuario (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    id_pessoa INT,
                                    email VARCHAR(100),
                                    senha VARCHAR(100),
                                    FOREIGN KEY (id_pessoa) REFERENCES Pessoa(id)
                                );''')
        self.db_cursor.execute('''CREATE TABLE IF NOT EXISTS PessoaFisica (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    id_usuario INT,
                                    cpf VARCHAR(15),
                                    dataNascimento DATE,
                                    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
                                );''')
        self.db_cursor.execute('''CREATE TABLE IF NOT EXISTS PessoaJuridica (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                id_usuario INT,
                                cnpj VARCHAR(18),
                                razaoSocial VARCHAR(100),
                                nomeFantasia VARCHAR(100),
                                FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
                                );''')


    def tearDown(self):
        """Limpeza após cada teste"""
        self.db_cursor.execute('DROP DATABASE IF EXISTS sistema_usuarios_test;')
        self.db_cursor.close()
        self.db_connection.close()

    def test_cadastro_pessoa_fisica(self):
        """Testa o cadastro de uma pessoa física"""
        # Dados para o cadastro
        data = {
            'nome': 'João Silva',
            'endereco': 'Rua A, 123',
            'email': 'joao.silva@gmail.com',
            'senha': 'senha123',
            'cpf': '12345678900',
            'dataNascimento': '1990-01-01'
        }

        # Faz a requisição POST para cadastrar a pessoa física
        response = self.app.post('/cadastro_pessoa_fisica', json=data)

        # Verifica se o cadastro foi bem-sucedido (status code 201)
        self.assertEqual(response.status_code, 201)

        # Verifica se a resposta contém a mensagem de sucesso
        self.assertIn('Pessoa Física cadastrada com sucesso', response.get_json()['message'])

        # Verifica se a pessoa foi cadastrada no banco de dados
        self.db_cursor.execute('SELECT * FROM Pessoa WHERE nome = %s', (data['nome'],))
        pessoa = self.db_cursor.fetchone()
        self.assertIsNotNone(pessoa)

    def test_listar_pessoas(self):
        """Testa a listagem de todas as pessoas cadastradas"""
        # Primeiramente, vamos cadastrar uma pessoa
        data = {
            'nome': 'Maria Souza',
            'endereco': 'Rua B, 456',
            'email': 'maria.souza@gmail.com',
            'senha': 'senha456',
            'cpf': '98765432100',
            'dataNascimento': '1985-05-05'
        }

        self.app.post('/cadastro_pessoa_fisica', json=data)

        # Realiza a requisição GET para listar as pessoas
        response = self.app.get('/pessoas')

        # Verifica se o status code é 200
        self.assertEqual(response.status_code, 200)

        # Verifica se a lista de pessoas contém ao menos uma pessoa cadastrada
        pessoas = response.get_json()
        self.assertGreater(len(pessoas), 0)

    def test_deletar_pessoa(self):
        """Testa a exclusão de uma pessoa"""
        # Cadastrar uma pessoa antes de deletar
        data = {
            'nome': 'Carlos Silva',
            'endereco': 'Rua C, 789',
            'email': 'carlos.silva@gmail.com',
            'senha': 'senha789',
            'cpf': '11223344556',
            'dataNascimento': '1980-12-12'
        }

        response = self.app.post('/cadastro_pessoa_fisica', json=data)
        pessoa_id = response.get_json().get('id')

        # Realiza a requisição DELETE para excluir a pessoa
        response = self.app.delete(f'/pessoa/{pessoa_id}')

        # Verifica se o status code é 200 e a mensagem de sucesso
        self.assertEqual(response.status_code, 200)
        self.assertIn('Pessoa deletada com sucesso', response.get_json()['message'])

        # Verifica se a pessoa foi realmente excluída
        response = self.app.get(f'/pessoa/{pessoa_id}')
        self.assertEqual(response.status_code, 404)  # Espera que o recurso não seja encontrado

if __name__ == '__main__':
    unittest.main()
