const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', citasController.getCitas);
router.post('/', authenticateToken, citasController.createCita);

module.exports = router;