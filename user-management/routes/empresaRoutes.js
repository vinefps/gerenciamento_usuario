const express = require("express");
const router = express.Router();
const { createEmpresa, getAllEmpresas } = require("../controllers/empresaController");

router.post("/", createEmpresa);
router.get("/", getAllEmpresas);

module.exports = router;
