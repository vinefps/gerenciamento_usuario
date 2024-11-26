const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O campo nome é obrigatório.'],
    },
    cnpj: {
      type: String,
      required: [true, 'O campo CNPJ é obrigatório.'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{14}$/.test(v); // Valida se o CNPJ possui 14 dígitos numéricos
        },
        message: (props) => `${props.value} não é um CNPJ válido.`,
      },
    },
    endereco: {
      type: String,
      required: [true, 'O campo endereço é obrigatório.'],
    },
    telefone: {
      type: String,
      required: [true, 'O campo telefone é obrigatório.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Empresa', empresaSchema);
