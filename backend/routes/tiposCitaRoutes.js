const express = require('express');
const router = express.Router();
const tiposCitaController = require('../controllers/tiposCitaController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, tiposCitaController.getTiposCita);
router.post('/', authenticateToken, tiposCitaController.createTipoCita);
router.delete('/:id', authenticateToken, tiposCitaController.deleteTipoCita);

module.exports = router;