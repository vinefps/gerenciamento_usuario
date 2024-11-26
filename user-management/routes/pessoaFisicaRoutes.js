const express = require('express');
const { createPessoaFisica, getPessoasFisicas } = require('../controllers/pessoaFisicaController');
const router = express.Router();

// Rota para criar uma nova pessoa física
router.post('/', createPessoaFisica);
router.get('/', getPessoasFisicas);

module.exports = router;




