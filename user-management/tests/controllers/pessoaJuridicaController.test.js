const request = require('supertest');
const app = require('../../index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


jest.setTimeout(30000); // Define timeout de 30 segundos

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
describe('Pessoa Jurídica Controller', () => {
  it('Deve criar uma nova pessoa jurídica', async () => {
    const res = await request(app)
      .post('/api/pessoas-juridicas')
      .send({
        nome: 'Empresa Exemplo',
        endereco: 'Avenida Central, 123',
        cnpj: '12345678000100',
        razaoSocial: 'Exemplo Razão Social',
        nomeFantasia: 'Fantasia Exemplo'
      });
  
    expect(res.statusCode).toBe(201);
    expect(res.body.cnpj).toBe('12345678000100');
  });
  

  it('Deve listar todas as pessoas jurídicas', async () => {
    const res = await request(app).get('/api/pessoas-juridicas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
