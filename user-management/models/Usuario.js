const mongoose = require("mongoose");
const PessoaSchema = require("./Pessoa");

const UsuarioSchema = new mongoose.Schema({
    ...PessoaSchema.obj,
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
