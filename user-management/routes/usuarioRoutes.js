const express = require('express');
const router = express.Router();
const { createUsuario, getUsuarios } = require('../controllers/usuarioController');

router.post('/', createUsuario);
router.get('/', getUsuarios);

module.exports = router;
