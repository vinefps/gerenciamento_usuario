const { createPessoa, getPessoas } = require('../../controllers/pessoaController');
const Pessoa = require('../../models/Pessoa');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

require('../setupTests');


const request = require('supertest');
const app = require('../../server'); // Certifique-se de exportar o app Express

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


describe('Pessoa Controller', () => {
    it('Deve criar uma nova pessoa', async () => {
        const req = { body: { nome: 'João Silva', email: 'joao@teste.com' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await createPessoa(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                nome: 'João Silva',
                email: 'joao@teste.com',
            })
        );
    });

    it('Deve listar todas as pessoas', async () => {
        await Pessoa.create({ nome: 'João Silva', email: 'joao@teste.com' });

        const res = await request(app).get('/api/pessoas');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].nome).toBe('João Silva');
    });
});
