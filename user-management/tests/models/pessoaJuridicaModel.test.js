const mongoose = require('mongoose');
const PessoaJuridica = require('../../models/PessoaJuridica');
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


describe('Pessoa Jurídica Model', () => {
  it('Deve salvar uma pessoa jurídica com dados válidos', async () => {
    const pessoaJuridica = new PessoaJuridica({
      pessoaId: new mongoose.Types.ObjectId(),
      cnpj: '12345678000199',
      razaoSocial: 'Empresa X',
    });

    const savedPessoaJuridica = await pessoaJuridica.save();
    expect(savedPessoaJuridica).toBeDefined();
    expect(savedPessoaJuridica.cnpj).toBe('12345678000199');
  });

  it('Deve falhar ao salvar uma pessoa jurídica com CNPJ duplicado', async () => {
    const cnpjDuplicado = '12345678000199';

    // Cria a primeira pessoa jurídica
    await PessoaJuridica.create({
      razaoSocial: 'Empresa X',
      cnpj: cnpjDuplicado,
      pessoaId: '1234567890abcdef12345678',
    });

    // Tenta criar outra pessoa jurídica com o mesmo CNPJ
    const pessoaJuridicaDuplicada = new PessoaJuridica({
      razaoSocial: 'Empresa Y',
      cnpj: cnpjDuplicado,
      pessoaId: '1234567890abcdef12345679',
    });

    let error;
    try {
      await pessoaJuridicaDuplicada.save();
    } catch (err) {
      error = err;
    }

    // Verifica se o erro foi capturado
    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // Código de erro de chave duplicada
  });



  it('Deve ser inválido se algum campo obrigatório estiver ausente', async () => {
    const pessoaJuridica = new PessoaJuridica({
      cnpj: '12345678000199',
      // Falta razaoSocial e pessoaId
    });

    let err;
    try {
      await pessoaJuridica.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.razaoSocial).toBeDefined();
    expect(err.errors.pessoaId).toBeDefined();
  });
});
