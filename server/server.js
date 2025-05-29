const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (CSS, JS, imágenes) desde la carpeta client
app.use(express.static(path.join(__dirname, '../client')));


app.get('/dailyFit', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
// Ruta para registrar progreso
app.post('/api/progress', (req, res) => {
  const { exercise, value, unit } = req.body;

  if (!exercise || !value || !unit) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const stmt = `INSERT INTO progress (exercise, value, unit) VALUES (?, ?, ?)`;

  db.run(stmt, [exercise, value, unit], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al guardar el progreso' });
    }

    res.status(201).json({
      id: this.lastID,
      exercise,
      value,
      unit,
      date: new Date().toISOString()
    });
  });
});

// Ruta para obtener historial de progreso
app.get('/api/progress', (req, res) => {
  db.all(`SELECT * FROM progress ORDER BY date DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener datos' });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
