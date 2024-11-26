const PessoaFisica = require('../models/PessoaFisica');
const Pessoa = require('../models/Pessoa');
const mongoose = require('mongoose');




exports.createPessoaFisica = async (req, res) => {
  try {
    const { pessoaId, cpf, dataNascimento } = req.body;

    if (!pessoaId || !cpf || !dataNascimento) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const novaPessoaFisica = await PessoaFisica.create({ pessoaId, cpf, dataNascimento });
    res.status(201).json(novaPessoaFisica);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getPessoasFisicas = async (req, res) => {
  try {
    // Busca todas as pessoas físicas e popula os dados da Pessoa associada
    const pessoasFisicas = await PessoaFisica.find().populate('pessoaId');
    res.status(200).json(pessoasFisicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

