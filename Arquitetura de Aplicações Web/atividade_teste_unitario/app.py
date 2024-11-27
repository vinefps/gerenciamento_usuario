from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configuração do banco de dados
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='0204Mis*',
        database='sistema_usuarios_test'
    )

# Classe base Pessoa
class Pessoa:
    def __init__(self, id, nome, endereco):
        self.id = id
        self.nome = nome
        self.endereco = endereco

# Classe Usuario (herda de Pessoa)
class Usuario(Pessoa):
    def __init__(self, id, nome, endereco, email, senha):
        super().__init__(id, nome, endereco)
        self.email = email
        self.senha = senha

# Classe PessoaFisica (herda de Usuario)
class PessoaFisica(Usuario):
    def __init__(self, id, nome, endereco, email, senha, cpf, data_nascimento):
        super().__init__(id, nome, endereco, email, senha)
        self.cpf = cpf
        self.data_nascimento = data_nascimento

# Classe PessoaJuridica (herda de Usuario)
class PessoaJuridica(Usuario):
    def __init__(self, id, nome, endereco, email, senha, cnpj, razao_social, nome_fantasia):
        super().__init__(id, nome, endereco, email, senha)
        self.cnpj = cnpj
        self.razao_social = razao_social
        self.nome_fantasia = nome_fantasia

# Função para cadastrar PessoaFisica
@app.route('/cadastro_pessoa_fisica', methods=['POST'])
def cadastro_pessoa_fisica():
    data = request.get_json()
    nome = data['nome']
    endereco = data['endereco']
    email = data['email']
    senha = data['senha']
    cpf = data['cpf']
    data_nascimento = data['dataNascimento']

    conn = get_db_connection()
    cursor = conn.cursor()

    # Inserir dados na tabela Pessoa
    cursor.execute('INSERT INTO Pessoa (nome, endereco) VALUES (%s, %s)', (nome, endereco))
    pessoa_id = cursor.lastrowid

    # Inserir dados na tabela Usuario
    cursor.execute('INSERT INTO Usuario (id_pessoa, email, senha) VALUES (%s, %s, %s)', 
                   (pessoa_id, email, senha))
    usuario_id = cursor.lastrowid

    # Inserir dados na tabela PessoaFisica
    cursor.execute('INSERT INTO PessoaFisica (id_usuario, cpf, dataNascimento) VALUES (%s, %s, %s)',
                   (usuario_id, cpf, data_nascimento))
    
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'id': pessoa_id, 'message': 'Pessoa Física cadastrada com sucesso'}), 201

# Função para cadastrar PessoaJuridica
@app.route('/cadastro_pessoa_juridica', methods=['POST'])
def cadastro_pessoa_juridica():
    data = request.get_json()
    nome = data['nome']
    endereco = data['endereco']
    email = data['email']
    senha = data['senha']
    cnpj = data['cnpj']
    razao_social = data['razaoSocial']
    nome_fantasia = data['nomeFantasia']

    conn = get_db_connection()
    cursor = conn.cursor()

    # Inserir dados na tabela Pessoa
    cursor.execute('INSERT INTO Pessoa (nome, endereco) VALUES (%s, %s)', (nome, endereco))
    pessoa_id = cursor.lastrowid

    # Inserir dados na tabela Usuario
    cursor.execute('INSERT INTO Usuario (id_pessoa, email, senha) VALUES (%s, %s, %s)', 
                   (pessoa_id, email, senha))
    usuario_id = cursor.lastrowid

    # Inserir dados na tabela PessoaJuridica
    cursor.execute('INSERT INTO PessoaJuridica (id_usuario, cnpj, razaoSocial, nomeFantasia) VALUES (%s, %s, %s, %s)',
                   (usuario_id, cnpj, razao_social, nome_fantasia))
    
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'id': pessoa_id, 'message': 'Pessoa Física cadastrada com sucesso'}), 201

# Função para listar todas as pessoas
@app.route('/pessoas', methods=['GET'])
def listar_pessoas():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Pessoa')
    pessoas = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(pessoas), 200

# Função para listar pessoa por ID
@app.route('/pessoa/<int:id>', methods=['GET'])
def obter_pessoa(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Pessoa WHERE id = %s', (id,))
    pessoa = cursor.fetchone()
    cursor.close()
    conn.close()

    if pessoa:
        return jsonify(pessoa), 200
    else:
        return jsonify({'message': 'Pessoa nao encontrada'}), 404

# Função para deletar uma pessoa (Pessoa Física ou Jurídica)
@app.route('/pessoa/<int:id>', methods=['DELETE'])
def deletar_pessoa(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Excluir da tabela PessoaFisica (se houver)
    cursor.execute('SELECT id FROM PessoaFisica WHERE id_usuario = %s', (id,))
    pessoa_fisica = cursor.fetchone()

    if pessoa_fisica:
        cursor.execute('DELETE FROM PessoaFisica WHERE id_usuario = %s', (id,))

    # Excluir da tabela PessoaJuridica (se houver)
    cursor.execute('SELECT id FROM PessoaJuridica WHERE id_usuario = %s', (id,))
    pessoa_juridica = cursor.fetchone()

    if pessoa_juridica:
        cursor.execute('DELETE FROM PessoaJuridica WHERE id_usuario = %s', (id,))

    # Agora, excluir o usuário da tabela Usuario
    cursor.execute('DELETE FROM Usuario WHERE id_pessoa = %s', (id,))

    # Excluir da tabela Pessoa
    cursor.execute('DELETE FROM Pessoa WHERE id = %s', (id,))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Pessoa deletada com sucesso'}), 200



if __name__ == '__main__':
    app.run(debug=True)
