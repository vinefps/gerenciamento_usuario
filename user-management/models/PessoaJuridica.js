const mongoose = require("mongoose");
const PessoaSchema = require("./Pessoa");

const PessoaJuridicaSchema = new mongoose.Schema({
    ...PessoaSchema.obj,
    cnpj: { type: String, required: true, unique: true },
    razaoSocial: { type: String, required: true },
    nomeFantasia: { type: String, required: true },
    empresas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Empresa" }],
});

module.exports = mongoose.model("PessoaJuridica", PessoaJuridicaSchema);
