const express = require('express');
const router = express.Router();
const ejercicioController = require('../controllers/ejercicioController');

router.post('/grupo-muscular', ejercicioController.crearGrupoMuscular);
router.get('/grupo-muscular', ejercicioController.obtenerGruposMusculares);

router.post('/', ejercicioController.crearEjercicio);
router.get('/', ejercicioController.obtenerEjercicios);

router.post('/sesion', ejercicioController.crearSesionEntrenamiento);

router.post('/ejercicio-aux', ejercicioController.crearEjercicioAux);

router.put('/:id', ejercicioController.actualizarEjercicio);

module.exports = router;