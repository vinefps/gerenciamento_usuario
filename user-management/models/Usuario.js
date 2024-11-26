const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O campo nome é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O campo email é obrigatório.'],
    unique: true,
  },
  senha: {
    type: String,
    required: [true, 'O campo senha é obrigatório.'],
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
