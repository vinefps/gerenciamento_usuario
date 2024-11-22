const express = require("express");
const router = express.Router();
const { createPessoaFisica, getAllPessoasFisicas } = require("../controllers/pessoaFisicaController");

router.post("/", createPessoaFisica);
router.get("/", getAllPessoasFisicas);

module.exports = router;
