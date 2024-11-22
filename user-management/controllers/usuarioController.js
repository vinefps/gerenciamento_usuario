const Usuario = require("../models/Usuario");

// Criar um novo usuário
const createUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Listar todos os usuários
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUsuario, getAllUsuarios };
