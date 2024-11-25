const PessoaJuridica = require('../../models/PessoaJuridica');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

jest.setTimeout(30000);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  await PessoaJuridica.init(); // Garante que os índices estão configurados
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

describe('Pessoa Jurídica Model', () => {
  it('Deve salvar uma pessoa jurídica com dados válidos', async () => {
    const pessoaJuridica = new PessoaJuridica({
      nome: 'Empresa Exemplo',
      endereco: 'Avenida Central, 123',
      cnpj: '12345678000100',
      razaoSocial: 'Exemplo Razão Social',
      nomeFantasia: 'Fantasia Exemplo',
    });

    const savedPessoaJuridica = await pessoaJuridica.save();
    expect(savedPessoaJuridica._id).toBeDefined();
    expect(savedPessoaJuridica.cnpj).toBe('12345678000100');
  });

  it('Deve falhar ao salvar uma pessoa jurídica com CNPJ duplicado', async () => {
    const cnpjDuplicado = '12345678000100';
  
    await PessoaJuridica.create({
      nome: 'Empresa A',
      endereco: 'Rua Teste, 123',
      cnpj: cnpjDuplicado,
      razaoSocial: 'Razão A',
      nomeFantasia: 'Fantasia A',
    });
  
    const pessoaJuridica = new PessoaJuridica({
      nome: 'Empresa B',
      endereco: 'Rua Teste, 456',
      cnpj: cnpjDuplicado,
      razaoSocial: 'Razão B',
      nomeFantasia: 'Fantasia B',
    });
  
    let error;
    try {
      await pessoaJuridica.save();
    } catch (err) {
      error = err;
    }
  
    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // Código de duplicação de chave
  });
  
});
