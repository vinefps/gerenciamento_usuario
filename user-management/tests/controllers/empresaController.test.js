const request = require('supertest');
const app = require('../../index'); // Certifique-se de exportar sua instância do Express em index.js
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

jest.setTimeout(30000); // Define um timeout de 30 segundos

let mongoServer;
// pessoaJuridicaModel.test.js
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

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

describe('Empresa Controller', () => {
  it('Deve criar uma nova empresa', async () => {
    const res = await request(app)
      .post('/api/empresas')
      .send({
        nome: 'Empresa Teste',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe('Empresa Teste');
  });
});
