const { createUsuario, getUsuarios } = require('../../controllers/usuarioController');
const Usuario = require('../../models/Usuario');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

require('../setupTests');


const request = require('supertest');
const app = require('../../server'); // Certifique-se de exportar o Express app

let mongoServer;
beforeEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});


describe('Usuario Controller', () => {
  it('Deve criar um usuário', async () => {
    const req = {
      body: {
        nome: 'João da Silva', // Inclua o campo obrigatório 'nome'
        email: 'joao@example.com',
        senha: 'senha123',
      },
    };


    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'João da Silva',
        email: 'joao@example.com',
      })
    );

  });

  it('Deve buscar todos os usuários', async () => {
    await Usuario.create({
      nome: 'João da Silva',
      email: 'joao@example.com',
      senha: '123456',
    });

    const res = await request(app).get('/api/usuarios');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].email).toBe('joao@example.com');
  });

  it('Deve retornar erro ao criar usuário com email duplicado', async () => {
    await Usuario.create({
      nome: 'João da Silva',
      email: 'duplicado@example.com',
      senha: 'senha123',
    });

    const req = {
      body: {
        nome: 'João da Silva', // Inclua o campo obrigatório 'nome'
        email: 'joao@example.com',
        senha: 'senha123',
      },
    };


    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'O email já está em uso.',
      })
    );
  });
});
