const mongoose = require("mongoose");

const PessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
});

module.exports = mongoose.model("Pessoa", PessoaSchema);
