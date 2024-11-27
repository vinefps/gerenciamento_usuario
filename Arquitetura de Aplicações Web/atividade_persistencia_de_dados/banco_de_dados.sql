CREATE DATABASE sistema_usuarios;

USE sistema_usuarios;

CREATE TABLE Pessoa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    endereco VARCHAR(255)
);

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pessoa INT,
    email VARCHAR(255),
    senha VARCHAR(255),
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa(id)
);

CREATE TABLE PessoaFisica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    cpf VARCHAR(11),
    dataNascimento DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE PessoaJuridica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    cnpj VARCHAR(14),
    razaoSocial VARCHAR(255),
    nomeFantasia VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);
