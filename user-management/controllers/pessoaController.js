const Pessoa = require("../models/Pessoa");

// Criar uma nova pessoa
const createPessoa = async (req, res) => {
  try {
    const pessoa = new Pessoa(req.body);
    await pessoa.save();
    res.status(201).json(pessoa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Listar todas as pessoas
const getAllPessoas = async (req, res) => {
  try {
    const pessoas = await Pessoa.find();
    res.status(200).json(pessoas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPessoa, getAllPessoas };
