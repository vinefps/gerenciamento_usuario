const mongoose = require('mongoose');

const PessoaJuridicaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  razaoSocial: { type: String, required: true },
  nomeFantasia: { type: String, required: true },
});

PessoaJuridicaSchema.index({ cnpj: 1 }, { unique: true });


module.exports = mongoose.model('PessoaJuridica', PessoaJuridicaSchema);
