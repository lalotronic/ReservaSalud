const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/:rut', usuariosController.getUsuarioByRut);

module.exports = router;