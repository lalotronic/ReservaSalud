const express = require('express');
const router = express.Router();
const disponibilidadesController = require('../controllers/disponibilidadesController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', disponibilidadesController.getDisponibilidades);
router.post('/', authenticateToken, disponibilidadesController.createDisponibilidad);
router.put('/', authenticateToken, disponibilidadesController.updateDisponibilidad);

module.exports = router;