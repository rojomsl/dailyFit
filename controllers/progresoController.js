const db = require('../db/dailyFit');

// Crear nuevo progreso
exports.crearProgreso = (req, res) => {
  const { ID_Usuario, ID_Ejercicio, Semana, Repeticiones, Peso } = req.body;

  if (!ID_Usuario || !ID_Ejercicio || !Semana || Repeticiones == null || Peso == null) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const stmt = `
    INSERT INTO Progreso (ID_Usuario, ID_Ejercicio, Semana, Repeticiones, Peso)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(stmt, [ID_Usuario, ID_Ejercicio, Semana, Repeticiones, Peso], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al guardar el progreso' });
    }

    res.status(201).json({
      ID_Progreso: this.lastID,
      ID_Usuario,
      ID_Ejercicio,
      Semana,
      Repeticiones,
      Peso
    });
  });
};

// Obtener todos los progresos
exports.obtenerProgresos = (req, res) => {
  const query = `
    SELECT 
      P.ID_Progreso,
      U.Nombre AS Usuario,
      E.Nombre_ejercicio AS Ejercicio,
      GM.Nombre_grupo_Muscular AS Grupo_muscular,
      P.Semana,
      P.Repeticiones,
      P.Peso
    FROM Progreso P
    JOIN Usuario U ON P.ID_Usuario = U.ID_Usuario
    JOIN Ejercicio E ON P.ID_Ejercicio = E.ID_Ejercicio
    JOIN Grupo_muscular GM ON E.ID_Grupo = GM.ID_Grupo
    ORDER BY P.ID_Progreso DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el progreso' });
    res.json(rows);
  });
};

// Actualizar progreso
exports.actualizarProgreso = (req, res) => {
  const { id } = req.params;
  const { ID_Usuario, ID_Ejercicio, Semana, Repeticiones, Peso } = req.body;

  const stmt = `
    UPDATE Progreso 
    SET ID_Usuario = ?, ID_Ejercicio = ?, Semana = ?, Repeticiones = ?, Peso = ?
    WHERE ID_Progreso = ?
  `;

  db.run(stmt, [ID_Usuario, ID_Ejercicio, Semana, Repeticiones, Peso, id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar progreso' });
    res.json({ message: 'Progreso actualizado' });
  });
};