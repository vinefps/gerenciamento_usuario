const PessoaJuridica = require('../models/PessoaJuridica');
const Pessoa = require('../models/Pessoa'); // Certifique-se de que o modelo de Pessoa existe
const mongoose = require('mongoose');


// Criar uma nova Pessoa Jurídica
exports.createPessoaJuridica = async (req, res) => {
  try {
    const { pessoaId, cnpj, razaoSocial } = req.body;

    // Verifica se a Pessoa associada existe
    const pessoa = await Pessoa.findById(pessoaId);
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada. Verifique o ID fornecido.' });
    }

    // Cria a nova Pessoa Jurídica
    const pessoaJuridica = new PessoaJuridica({
      pessoaId,
      cnpj,
      razaoSocial,
    });

    const savedPessoaJuridica = await pessoaJuridica.save();
    res.status(201).json(savedPessoaJuridica);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'O CNPJ informado já está em uso.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Obter todas as Pessoas Jurídicas
exports.getPessoasJuridicas = async (req, res) => {
  try {
    const pessoasJuridicas = await PessoaJuridica.find().populate('pessoaId');
    res.status(200).json(pessoasJuridicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter Pessoa Jurídica por ID
exports.getPessoaJuridicaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pessoaJuridica = await PessoaJuridica.findById(id).populate('pessoaId');

    if (!pessoaJuridica) {
      return res.status(404).json({ error: 'Pessoa Jurídica não encontrada.' });
    }

    res.status(200).json(pessoaJuridica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar Pessoa Jurídica
exports.updatePessoaJuridica = async (req, res) => {
  try {
    const { id } = req.params;
    const { cnpj, razaoSocial } = req.body;

    const updatedPessoaJuridica = await PessoaJuridica.findByIdAndUpdate(
      id,
      { cnpj, razaoSocial },
      { new: true, runValidators: true }
    );

    if (!updatedPessoaJuridica) {
      return res.status(404).json({ error: 'Pessoa Jurídica não encontrada.' });
    }

    res.status(200).json(updatedPessoaJuridica);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'O CNPJ informado já está em uso.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Deletar Pessoa Jurídica
exports.deletePessoaJuridica = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPessoaJuridica = await PessoaJuridica.findByIdAndDelete(id);
    if (!deletedPessoaJuridica) {
      return res.status(404).json({ error: 'Pessoa Jurídica não encontrada.' });
    }

    res.status(200).json({ message: 'Pessoa Jurídica deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
