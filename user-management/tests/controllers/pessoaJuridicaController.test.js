const { createPessoaJuridica, getPessoasJuridicas } = require('../../controllers/pessoaJuridicaController');
const PessoaJuridica = require('../../models/PessoaJuridica');
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



describe('Pessoa Jurídica Controller', () => {
  it('Deve criar uma nova Pessoa Jurídica', async () => {
    const pessoa = await Pessoa.create({ nome: 'Empresa Y', email: 'empresa@example.com' });

    const req = {
      body: {
        pessoaId: pessoa._id.toString(),
        cnpj: '12345678000199',
        razaoSocial: 'Empresa X',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createPessoaJuridica(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        cnpj: '12345678000199',
        pessoaId: pessoa._id.toString(),
        razaoSocial: 'Empresa X',
      })
    );



  });

  it('Deve listar todas as Pessoas Jurídicas', async () => {
    const pessoa = await Pessoa.create({ nome: 'Empresa Z', email: 'empresa2@example.com' });

    await PessoaJuridica.create({
      pessoaId: pessoa._id,
      cnpj: '98765432000100',
      razaoSocial: 'Empresa Z',
    });

    const res = await request(app).get('/api/pessoas-juridicas');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].cnpj).toBe('98765432000100');
  });
});
