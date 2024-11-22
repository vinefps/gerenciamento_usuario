const express = require("express");
const router = express.Router();
const { createPessoaJuridica, getAllPessoasJuridicas } = require("../controllers/pessoaJuridicaController");

router.post("/", createPessoaJuridica);
router.get("/", getAllPessoasJuridicas);

module.exports = router;
