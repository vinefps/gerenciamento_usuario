const express = require('express');
const router = express.Router();
const { createPessoa, getAllPessoas } = require('../controllers/pessoaController');

router.post("/", createPessoa);
router.get("/", getAllPessoas);

module.exports = router;
