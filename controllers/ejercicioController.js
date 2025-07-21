const db = require('../db/dailyFit');

// Crear nuevo grupo muscular
exports.crearGrupoMuscular = (req, res) => {
  const { Nombre_grupo_Muscular } = req.body;

  if (!Nombre_grupo_Muscular) {
    return res.status(400).json({ error: 'El nombre del grupo muscular es requerido' });
  }

  const stmt = `INSERT INTO Grupo_muscular (Nombre_grupo_Muscular) VALUES (?)`;

  db.run(stmt, [Nombre_grupo_Muscular], function (err) {
    if (err) return res.status(500).json({ error: 'Error al guardar grupo muscular' });
    res.status(201).json({ ID_Grupo: this.lastID, Nombre_grupo_Muscular });
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
  const { ID_Grupo, Nombre_ejercicio } = req.body;

  if (!ID_Grupo || !Nombre_ejercicio) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const stmt = `INSERT INTO Ejercicio (ID_Grupo, Nombre_ejercicio) VALUES (?, ?)`;

  db.run(stmt, [ID_Grupo, Nombre_ejercicio], function (err) {
    if (err) return res.status(500).json({ error: 'Error al guardar ejercicio' });
    res.status(201).json({ ID_Ejercicio: this.lastID, ID_Grupo, Nombre_ejercicio });
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