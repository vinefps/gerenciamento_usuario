const Pessoa = require('../models/Pessoa');
const mongoose = require('mongoose');

// Criar uma nova pessoa
exports.createPessoa = async (req, res) => {
  try {
    const { nome, email } = req.body;

    const pessoa = new Pessoa({ nome, email });
    const savedPessoa = await pessoa.save();

    res.status(201).json(savedPessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as pessoas
exports.getAllPessoas = async (req, res) => {
  try {
    const pessoas = await Pessoa.find();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma pessoa
exports.updatePessoa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const updatedPessoa = await Pessoa.findByIdAndUpdate(id, { nome, email }, { new: true, runValidators: true });

    if (!updatedPessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }

    res.status(200).json(updatedPessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir uma pessoa
exports.deletePessoa = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPessoa = await Pessoa.findByIdAndDelete(id);
    if (!deletedPessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }

    res.status(200).json({ message: 'Pessoa excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
