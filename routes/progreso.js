const express = require('express');
const router = express.Router();
const progresoController = require('../controllers/progresoController');

router.post('/', progresoController.crearProgreso);
router.get('/', progresoController.obtenerProgresos);
router.put('/:id', progresoController.actualizarProgreso);

module.exports = router;