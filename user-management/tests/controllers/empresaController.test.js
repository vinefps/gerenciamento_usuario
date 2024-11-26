const { createEmpresa, getEmpresas } = require('../../controllers/empresaController');
const Empresa = require('../../models/Empresa');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

require('../setupTests');




jest.mock('../../models/Empresa');

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


describe('Empresa Controller', () => {
  it('Deve criar uma nova empresa', async () => {
    const req = { body: { nome: 'Empresa X', cnpj: '12345678000199', endereco: 'Rua 1', telefone: '12345678' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Empresa.prototype.save.mockResolvedValue({
      _id: 'mockedId',
      nome: 'Empresa X',
      cnpj: '12345678000199',
      endereco: 'Rua 1',
      telefone: '12345678',
    });

    await createEmpresa(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: 'mockedId',
      nome: 'Empresa X',
      cnpj: '12345678000199',
      endereco: 'Rua 1',
      telefone: '12345678',
    });
  });

  it('Deve buscar todas as empresas', async () => {
    const empresas = [
      { _id: 'id1', nome: 'Empresa Y', cnpj: '98765432000100', endereco: 'Rua 2', telefone: '87654321' },
    ];

    Empresa.find.mockResolvedValue(empresas);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getEmpresas(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(empresas);
  });
});
