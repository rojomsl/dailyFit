const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());  
app.use('/modules', express.static(path.join(__dirname, 'client/modules')));
app.use('/images', express.static(path.join(__dirname, 'client/images')));


// Rutas API
app.use('/api/usuario', require('./routes/usuarios'));
app.use('/api/ejercicio', require('./routes/ejercicios'));
app.use('/api/progress', require('./routes/progreso'));

// Ruta principal
app.get('/dailyFit', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
