const mongoose = require('mongoose');
const Usuario = require('../../models/Usuario');
const { MongoMemoryServer } = require('mongodb-memory-server');


require('../setupTests');


let mongoServer;


beforeAll(async () => {
  await mongoose.connection.db.collection('usuarios').createIndex({ email: 1 }, { unique: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});
beforeEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
});


describe('Usuario Model', () => {
  it('Deve salvar um usuário com dados válidos', async () => {
    const usuario = new Usuario({
      nome: 'João da Silva',
      email: 'joao.silva@example.com',
      senha: '123456',
    });

    const savedUsuario = await usuario.save();
    expect(savedUsuario._id).toBeDefined();
    expect(savedUsuario.nome).toBe('João da Silva');
    expect(savedUsuario.email).toBe('joao.silva@example.com');
  });

  it('Deve falhar ao salvar um usuário sem email', async () => {
    const usuario = new Usuario({
      nome: 'Maria Sem Email',
      senha: '123456',
    });

    await expect(usuario.save()).rejects.toThrow();
  });

  it('Deve falhar ao salvar um usuário com email duplicado', async () => {
    const emailDuplicado = 'test@example.com';

    await Usuario.create({ nome: 'Usuário 1', email: emailDuplicado, senha: 'senha123' });

    let error;
    try {
      await Usuario.create({ nome: 'Usuário 2', email: emailDuplicado, senha: 'senha456' });
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // Código de duplicação de chave
  });


  it('Deve ser inválido se algum campo obrigatório estiver ausente', async () => {
    const usuario = new Usuario({
      senha: '123456', // Falta nome e email
    });

    let error;
    try {
      await usuario.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.nome).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });
});
