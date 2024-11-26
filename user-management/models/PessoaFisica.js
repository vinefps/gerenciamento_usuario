const mongoose = require('mongoose');

const pessoaFisicaSchema = new mongoose.Schema({
  pessoaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pessoa',
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('PessoaFisica', pessoaFisicaSchema);
