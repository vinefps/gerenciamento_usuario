const Pessoa = require('../../models/Pessoa');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

require('../setupTests');



beforeEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
});

describe('Pessoa Model', () => {
  it('Deve falhar se algum campo obrigatório estiver ausente', async () => {
    const pessoa = new Pessoa({
      // email e nome ausentes
    });

    let err;
    try {
      await pessoa.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.nome).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });

  it('Deve criar uma pessoa válida', async () => {
    const pessoa = new Pessoa({
      nome: 'João Silva',
      email: 'joao@teste.com',
    });

    let err;
    try {
      await pessoa.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeUndefined();
  });
});
