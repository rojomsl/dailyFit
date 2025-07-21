const db = require('../db/db2');

exports.obtenerTodos = (req, res) => {
  db.all('SELECT * FROM Usuario', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(rows);
  });
};

exports.obtenerPorCorreo = (req, res) => {
  const correo = req.query.correo;
  if (!correo) return res.status(400).json({ error: 'Correo requerido' });

  db.get('SELECT ID_Usuario FROM Usuario WHERE correo = ?', [correo], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el usuario' });
    if (!row) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(row);
  });
};

exports.login = (req, res) => {
  const { correo } = req.body;
  if (!correo) return res.status(400).json({ error: 'Se requiere el correo' });

  db.get('SELECT * FROM Usuario WHERE correo = ?', [correo], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
    if (!row) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(row);
  });
};

exports.crear = (req, res) => {
  const { Nombre, Genero, Edad, Telefono, Correo } = req.body;
  if (!Nombre || !Genero || Edad == null) return res.status(400).json({ error: 'Nombre, Género y Edad son requeridos' });

  const stmt = `INSERT INTO Usuario (Nombre, Genero, Edad, Telefono, Correo) VALUES (?, ?, ?, ?, ?)`;
  db.run(stmt, [Nombre, Genero, Edad, Telefono, Correo], function (err) {
    if (err) return res.status(500).json({ error: 'Error al guardar usuario' });
    res.status(201).json({ ID_Usuario: this.lastID, Nombre, Genero, Edad, Telefono, Correo });
  });
};

exports.actualizar = (req, res) => {
  const { id } = req.params;
  const { Nombre, Genero, Edad, Telefono, Correo } = req.body;

  const stmt = `UPDATE Usuario SET Nombre = ?, Genero = ?, Edad = ?, Telefono = ?, Correo = ? WHERE ID_Usuario = ?`;
  db.run(stmt, [Nombre, Genero, Edad, Telefono, Correo, id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    res.json({ message: 'Usuario actualizado' });
  });
};

exports.eliminar = (req, res) => {
  db.run('DELETE FROM Usuario WHERE ID_Usuario = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    res.json({ message: 'Usuario eliminado' });
  });
};