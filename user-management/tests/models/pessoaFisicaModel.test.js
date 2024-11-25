const PessoaFisica = require('../../models/PessoaFisica');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;


jest.setTimeout(30000); // Define um timeout de 30 segundos

// pessoaJuridicaModel.test.js
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Pessoa Física Model', () => {
  it('Deve salvar uma pessoa física com dados válidos', async () => {
    const pessoaFisica = new PessoaFisica({
      nome: 'Maria',
      endereco: 'Rua das Flores, 123',
      cpf: '12345678900',
      dataNascimento: '1990-01-01',
    });
    const savedPessoaFisica = await pessoaFisica.save();
    expect(savedPessoaFisica._id).toBeDefined();
    expect(savedPessoaFisica.cpf).toBe('12345678900');
  });

  it('Deve falhar ao salvar uma pessoa física sem CPF', async () => {
    const pessoaFisica = new PessoaFisica({
      nome: 'Maria',
      endereco: 'Rua das Flores, 123',
      dataNascimento: '1990-01-01',
    });
    await expect(pessoaFisica.save()).rejects.toThrow();
  });
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