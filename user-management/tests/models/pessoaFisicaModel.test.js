const mongoose = require('mongoose');
const PessoaFisica = require('../../models/PessoaFisica');
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



describe('PessoaFisica Model', () => {
  it('Deve ser inválido se algum campo obrigatório estiver ausente', async () => {
    const pessoaFisica = new PessoaFisica({
      cpf: '12345678900',
      // Falta dataNascimento e pessoaId
    });

    let err;
    try {
      await pessoaFisica.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.dataNascimento).toBeDefined();
    expect(err.errors.pessoaId).toBeDefined();
  });

  it('Deve criar uma Pessoa Física válida', async () => {
    const pessoaFisica = new PessoaFisica({
      pessoaId: new mongoose.Types.ObjectId(),
      cpf: '12345678900',
      dataNascimento: new Date('1990-05-15'),
    });

    const savedPessoaFisica = await pessoaFisica.save();
    expect(savedPessoaFisica).toBeDefined();
    expect(savedPessoaFisica.cpf).toBe('12345678900');
  });

  it('Deve falhar ao criar uma Pessoa Física com CPF duplicado', async () => {
    const cpfDuplicado = '12345678900';

    await PessoaFisica.create({
      pessoaId: new mongoose.Types.ObjectId(),
      cpf: cpfDuplicado,
      dataNascimento: new Date('1990-05-15'),
    });

    const pessoaFisica = new PessoaFisica({
      pessoaId: new mongoose.Types.ObjectId(),
      cpf: cpfDuplicado,
      dataNascimento: new Date('1992-08-25'),
    });

    let err;
    try {
      await pessoaFisica.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // Código de duplicação de chave
  });
});
