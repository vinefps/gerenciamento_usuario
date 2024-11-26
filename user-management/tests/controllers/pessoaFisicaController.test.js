const { createPessoaFisica, getPessoasFisicas } = require('../../controllers/pessoaFisicaController');
const PessoaFisica = require('../../models/PessoaFisica');
const Pessoa = require('../../models/Pessoa');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

require('../setupTests');


const request = require('supertest');
const app = require('../../server'); // Certifique-se de exportar o Express app

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



describe('PessoaFisica Controller', () => {
  // Exemplo de teste corrigido
  it('Deve criar uma nova Pessoa Física', async () => {
    // Mock da requisição
    const req = {
      body: {
        pessoaId: '6746336c3f772c2481e19165',
        cpf: '12345678900',
        dataNascimento: '1990-05-15',
      },
    };

    // Mock da resposta
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama o controlador (ajuste conforme o nome e localização do seu controlador)
    await createPessoaFisica(req, res);

    // Verifica se o status foi chamado com o código correto
    expect(res.status).toHaveBeenCalledWith(201);

    // Aqui entra a verificação do objeto retornado
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        pessoaId: req.body.pessoaId,
        cpf: req.body.cpf,
        dataNascimento: expect.any(String), // Ou Date, dependendo do formato
      })
    );

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

  it('Deve listar todas as Pessoas Físicas', async () => {
    const pessoa = await Pessoa.create({ nome: 'João Silva', email: 'joao@example.com' });
    await PessoaFisica.create({
      pessoaId: pessoa._id,
      cpf: '12345678900',
      dataNascimento: new Date('1990-05-15'),
    });

    const res = await request(app).get('/api/pessoas-fisicas');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].cpf).toBe('12345678900');
  });
});
