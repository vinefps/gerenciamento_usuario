const mongoose = require("mongoose");

const empresaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    pessoaFisicas: [{ type: mongoose.Schema.Types.ObjectId, ref: "PessoaFisica" }],
    pessoaJuridicas: [{ type: mongoose.Schema.Types.ObjectId, ref: "PessoaJuridica" }],
});

module.exports = mongoose.model("Empresa", empresaSchema);
