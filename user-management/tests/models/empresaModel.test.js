const Empresa = require('../../models/Empresa');
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

describe('Empresa Model', () => {
  it('Deve criar uma empresa com campos válidos', async () => {
    const empresa = new Empresa({ nome: 'Empresa Teste' });
    const savedEmpresa = await empresa.save();
    expect(savedEmpresa._id).toBeDefined();
    expect(savedEmpresa.nome).toBe('Empresa Teste');
  });

  it('Deve falhar ao criar uma empresa sem o nome', async () => {
    const empresa = new Empresa({});
    let err;
    try {
      await empresa.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.nome).toBeDefined();
  });
});
