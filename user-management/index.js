const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const pessoaRoutes = require("./routes/pessoaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const empresaRoutes = require("./routes/empresaRoutes");
const pessoaFisicaRoutes = require("./routes/pessoaFisicaRoutes");
const pessoaJuridicaRoutes = require("./routes/pessoaJuridicaRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Usar as rotas
app.use("/api/pessoas", pessoaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/empresas", empresaRoutes);
app.use("/api/pessoas-fisicas", pessoaFisicaRoutes);
app.use("/api/pessoas-juridicas", pessoaJuridicaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
