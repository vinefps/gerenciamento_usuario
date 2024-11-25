const mongoose = require('mongoose');
const PessoaSchema = require('./Pessoa');

const PessoaFisicaSchema = new mongoose.Schema({
  ...PessoaSchema.obj,
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  empresas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' }],
});

PessoaFisicaSchema.index({ cpf: 1 }, { unique: true });

module.exports = mongoose.model('PessoaFisica', PessoaFisicaSchema);
