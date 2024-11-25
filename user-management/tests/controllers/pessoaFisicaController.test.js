const request = require('supertest');
const app = require('../../index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;

jest.setTimeout(30000);

beforeAll(async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);
});

afterAll(async () => {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Pessoa Física Controller', () => {
  it('Deve criar uma nova pessoa física', async () => {
    const res = await request(app)
      .post('/api/pessoas-fisicas')
      .send({
        nome: 'Maria Silva',
        endereco: 'Rua das Flores, 123',
        cpf: '12345678900',
        dataNascimento: '1990-01-01',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('nome', 'Maria Silva');
    expect(res.body).toHaveProperty('endereco', 'Rua das Flores, 123');
    expect(res.body).toHaveProperty('cpf', '12345678900');
  });

  it('Deve listar todas as pessoas físicas', async () => {
    const res = await request(app).get('/api/pessoas-fisicas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
