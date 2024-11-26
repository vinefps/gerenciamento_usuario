const express = require('express');
const router = express.Router();
const { createEmpresa, getEmpresas } = require('../controllers/empresaController');

router.post('/', createEmpresa);
router.get('/', getEmpresas);

module.exports = router;
