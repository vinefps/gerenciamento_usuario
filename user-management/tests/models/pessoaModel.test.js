const Pessoa = require('../../models/Pessoa');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  await Pessoa.init();
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Pessoa Model', () => {
  it('Deve salvar uma pessoa com dados válidos', async () => {
    const pessoa = new Pessoa({ nome: 'João Silva', endereco: 'Rua 123' });
    const savedPessoa = await pessoa.save();
    expect(savedPessoa._id).toBeDefined();
    expect(savedPessoa.nome).toBe('João Silva');
  });

  it('Deve falhar ao salvar uma pessoa sem nome', async () => {
    const pessoa = new Pessoa({ endereco: 'Rua 123' });
    await expect(pessoa.save()).rejects.toThrow();
  });
});
