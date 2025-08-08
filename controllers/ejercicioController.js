const mensajeRequeridos = require('./utilities.js');
const db = require('../db/dailyFit');

// Crear nuevo grupo muscular
exports.crearGrupoMuscular = (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del grupo muscular es requerido' });
  }

  const stmt = `INSERT INTO GrupoMuscular (nombre) VALUES (?)`;

  db.run(stmt, [nombre], function (err) {
    if (err) return res.status(500).json({ error: 'Error al guardar grupo muscular' });
    res.status(201).json({ id: this.lastID, nombre });
  });
};

// Obtener todos los grupos musculares
exports.obtenerGruposMusculares = (req, res) => {
  db.all('SELECT * FROM Grupo_muscular', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener grupos musculares' });
    res.json(rows);
  });
};

// Crear nuevo ejercicio
exports.crearEjercicio = (req, res) => {
  const { id_Grupo, nombre } = req.body;

  if (!id_Grupo || !nombre) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const stmt = `INSERT INTO Ejercicio (id_Grupo, nombre) VALUES (?, ?)`;

  db.run(stmt, [id_Grupo, nombre], function (err) {
    if (err) return res.status(500).json({ error: 'Error al guardar ejercicio' });
    res.status(201).json({ id: this.lastID, id_Grupo, nombre });
  });
};

// Crear nueva SesionEntrenamiento
exports.crearSesionEntrenamiento = (req, res) => {
  const { id_usuario, fecha, notas } = req.body;

   const camposRequeridos = [
    { valor: id_usuario, nombre: 'id_usuario' },
    { valor: fecha, nombre: 'fecha' }
  ];

  if (mensajeRequeridos(camposRequeridos)) {
    return res.status(400).json({ error: mensajeRequeridos(camposRequeridos) });
  }

  const stmt = `INSERT INTO SesionEntrenamiento (id_usuario, Notas) VALUES (?, ?)`;

  db.run(stmt, [id_usuario, notas], function (err) {
    if (err) {
  console.error('Error al guardar sesión:', err);
  return res.status(500).json({ error: err.message });
}

    res.status(201).json({ id: this.lastID, id_usuario, notas });
  });
};


// Crear nuevo EjercicioAux para sesion
exports.crearEjercicioAux = (req, res) => {
  const { id_sesionEntrenamiento, id_ejercicio } = req.body;

  if (!id_sesionEntrenamiento || !id_ejercicio) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const stmt = `INSERT INTO EjercicioAux (id_sesionEntrenamiento, id_ejercicio) VALUES (?, ?)`;

  db.run(stmt, [id_sesionEntrenamiento, id_ejercicio], function (err) {
    if (err) return res.status(500).json({ error: 'Error al guardar ejercicio' });
    res.status(201).json({ id: this.lastID, id_sesionEntrenamiento, id_ejercicio });
  });
};

// Obtener todos los ejercicios
exports.obtenerEjercicios = (req, res) => {
  db.all('SELECT * FROM Ejercicio', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener ejercicios' });
    res.json(rows);
  });
};

// Actualizar ejercicio
exports.actualizarEjercicio = (req, res) => {
  const { id } = req.params;
  const { ID_Grupo, Nombre_ejercicio } = req.body;

  const stmt = `
    UPDATE Ejercicio 
    SET ID_Grupo = ?, Nombre_ejercicio = ?
    WHERE ID_Ejercicio = ?
  `;

  db.run(stmt, [ID_Grupo, Nombre_ejercicio, id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar ejercicio' });
    res.json({ message: 'Ejercicio actualizado' });
  });
};