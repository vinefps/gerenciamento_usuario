const PessoaFisica = require("../models/PessoaFisica");

const createPessoaFisica = (req, res) => {
    res.status(201).json({
      message: "Pessoa física criada com sucesso!",
      data: req.body,
    });
  };
  const getAllPessoasFisicas = (req, res) => {
    res.status(200).json({
      message: "Listando todas as pessoas físicas",
      data: [],
    });
  };

module.exports = { createPessoaFisica, getAllPessoasFisicas };
