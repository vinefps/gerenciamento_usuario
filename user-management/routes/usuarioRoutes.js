const express = require("express");
const router = express.Router();
const { createUsuario, getAllUsuarios } = require("../controllers/usuarioController");

// Rotas de Usuário
router.post("/", createUsuario);
router.get("/", getAllUsuarios);

module.exports = router;
