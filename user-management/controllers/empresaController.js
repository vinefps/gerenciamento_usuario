const Empresa = require('../models/Empresa');
const mongoose = require('mongoose');


// Criar uma nova Empresa
exports.createEmpresa = async (req, res) => {
  try {
    const { nome, cnpj, endereco, telefone } = req.body;

    // Cria a nova Empresa
    const empresa = new Empresa({
      nome,
      cnpj,
      endereco,
      telefone,
    });

    const savedEmpresa = await empresa.save();
    res.status(201).json(savedEmpresa);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'O CNPJ informado já está em uso.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Obter todas as Empresas
exports.getEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter Empresa por ID
exports.getEmpresaById = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa não encontrada.' });
    }

    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar Empresa
exports.updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cnpj, endereco, telefone } = req.body;

    const updatedEmpresa = await Empresa.findByIdAndUpdate(
      id,
      { nome, cnpj, endereco, telefone },
      { new: true, runValidators: true }
    );

    if (!updatedEmpresa) {
      return res.status(404).json({ error: 'Empresa não encontrada.' });
    }

    res.status(200).json(updatedEmpresa);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'O CNPJ informado já está em uso.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Deletar Empresa
exports.deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmpresa = await Empresa.findByIdAndDelete(id);
    if (!deletedEmpresa) {
      return res.status(404).json({ error: 'Empresa não encontrada.' });
    }

    res.status(200).json({ message: 'Empresa deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
