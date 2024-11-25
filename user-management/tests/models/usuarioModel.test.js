const Usuario = require('../../models/Usuario');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  await Usuario.init();
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  await Usuario.deleteMany();
});

describe('Usuário Model', () => {
  it('Deve salvar um usuário com dados válidos', async () => {
    const usuario = new Usuario({
      nome: 'João da Silva',
      endereco: 'Rua Principal, 45',
      email: 'joao.silva@example.com',
      senha: '123456',
    });

    const savedUsuario = await usuario.save();
    expect(savedUsuario._id).toBeDefined();
    expect(savedUsuario.email).toBe('joao.silva@example.com');
    expect(savedUsuario.nome).toBe('João da Silva');
  });

  it('Deve falhar ao salvar um usuário sem e-mail', async () => {
    const usuario = new Usuario({
      nome: 'Maria Sem Email',
      endereco: 'Rua Secundária, 67',
      senha: 'senhaSegura',
    });

    await expect(usuario.save()).rejects.toThrow();
  });

  it('Deve falhar ao salvar um usuário com e-mail duplicado', async () => {
    const emailDuplicado = 'duplicado@example.com';

    await Usuario.create({
      nome: 'Usuário 1',
      endereco: 'Endereço 1',
      email: emailDuplicado,
      senha: 'senha123',
    });

    const usuario = new Usuario({
      nome: 'Usuário 2',
      endereco: 'Endereço 2',
      email: emailDuplicado,
      senha: 'senha456',
    });

    let error;
    try {
      await usuario.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('MongoServerError');
    expect(error.code).toBe(11000);
  });
});
