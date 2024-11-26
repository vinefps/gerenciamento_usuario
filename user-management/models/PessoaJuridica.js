const mongoose = require('mongoose');

const pessoaJuridicaSchema = new mongoose.Schema({
  razaoSocial: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
    unique: true, // Garante a unicidade
  },
  pessoaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pessoa',
    required: true,
  },
});

module.exports = mongoose.model('PessoaJuridica', pessoaJuridicaSchema);
