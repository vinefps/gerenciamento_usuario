const request = require('supertest');
const app = require('../../index');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;


jest.setTimeout(30000); // Define um timeout de 30 segundos
// pessoaJuridicaModel.test.js
beforeAll(async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect(); // Certifique-se de desconectar antes de conectar novamente
  }

  await mongoose.connect(uri);
});

afterAll(async () => {
  if (mongoServer) {
    await mongoose.disconnect(); // Desconecta do MongoDB
    await mongoServer.stop(); // Para o servidor em memória
  }
});
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Usuário Controller', () => {
  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nome: 'Usuário Teste',
        endereco: 'Rua ABC, 123',
        email: 'usuario@teste.com',
        senha: '123456'
      });
  
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('usuario@teste.com');
  });
  


  it('Deve listar todos os usuários', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
