const PessoaFisica = require('../models/PessoaFisica');

const createPessoaFisica = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debug log
    const pessoaFisica = new PessoaFisica(req.body);
    const savedPessoaFisica = await pessoaFisica.save();

    // Busca o documento completo com todas as propriedades
    const populatedPessoaFisica = await PessoaFisica.findById(savedPessoaFisica._id).lean();
    res.status(201).json(populatedPessoaFisica);
  } catch (err) {
    console.error('Erro ao criar Pessoa Física:', err.message);
    res.status(400).json({ message: err.message });
  }
};

const getAllPessoasFisicas = async (req, res) => {
  try {
    const pessoasFisicas = await PessoaFisica.find().lean();
    res.status(200).json(pessoasFisicas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPessoaFisica, getAllPessoasFisicas };
