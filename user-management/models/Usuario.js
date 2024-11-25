const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

// Garante o índice único
UsuarioSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);
