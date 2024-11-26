const express = require('express');
const router = express.Router();
const { createPessoaJuridica, getPessoasJuridicas } = require('../controllers/pessoaJuridicaController');

router.post('/', createPessoaJuridica);
router.get('/', getPessoasJuridicas);

module.exports = router;
