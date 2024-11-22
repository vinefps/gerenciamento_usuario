const PessoaJuridica = require("../models/PessoaJuridica");

// Criar uma nova pessoa jurídica
const createPessoaJuridica = async (req, res) => {
  try {
    const pessoaJuridica = new PessoaJuridica(req.body);
    const savedPessoaJuridica = await pessoaJuridica.save();
    res.status(201).json(savedPessoaJuridica);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Listar todas as pessoas jurídicas
const getAllPessoasJuridicas = async (req, res) => {
  try {
    const pessoasJuridicas = await PessoaJuridica.find().populate("empresa");
    res.status(200).json(pessoasJuridicas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPessoaJuridica, getAllPessoasJuridicas };
