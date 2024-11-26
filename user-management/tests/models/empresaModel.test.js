const mongoose = require('mongoose');
const Empresa = require('../../models/Empresa');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('../setupTests');


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



describe('Empresa Model', () => {
  it('Deve criar uma empresa com campos válidos', async () => {
    const empresa = new Empresa({
      nome: 'Empresa Teste',
      cnpj: '12345678000199',
      endereco: 'Rua 1',
      telefone: '12345678',
    });

    const savedEmpresa = await empresa.save();
    expect(savedEmpresa.nome).toBe('Empresa Teste');
    expect(savedEmpresa.cnpj).toBe('12345678000199');
  });

  it('Deve falhar ao criar uma empresa sem o nome', async () => {
    const empresa = new Empresa({
      cnpj: '12345678000199',
      endereco: 'Rua 1',
      telefone: '12345678',
    });

    let error;
    try {
      await empresa.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.nome).toBeDefined();
  });

  it('Deve falhar ao criar uma empresa com CNPJ duplicado', async () => {
    const cnpjDuplicado = '12345678000199';

    await Empresa.create({
      nome: 'Empresa A',
      cnpj: cnpjDuplicado,
      endereco: 'Rua 1',
      telefone: '12345678',
    });

    const empresa = new Empresa({
      nome: 'Empresa B',
      cnpj: cnpjDuplicado,
      endereco: 'Rua 2',
      telefone: '87654321',
    });

    let error;
    try {
      await empresa.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // Código de erro de chave duplicada
  });
});
