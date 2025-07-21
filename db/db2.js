const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear o conectar a la base de datos
const db2 = new sqlite3.Database(path.resolve(__dirname, 'dailyfit_v2.db'), (err) => {
  if (err) return console.error('Error al conectar con SQLite:', err.message);
  console.log('Conectado a la base de datos SQLite ✅');
});

// Crear tablas si no existen
db2.serialize(() => {
  db2.run(`
    CREATE TABLE IF NOT EXISTS Usuario (
      ID_Usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      Genero TEXT NOT NULL,
      Edad INTEGER NOT NULL,
      Telefono TEXT,
      Correo TEXT UNIQUE
    )
  `);

  db2.run(`
    CREATE TABLE IF NOT EXISTS Grupo_muscular (
      ID_Grupo INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre_grupo_Muscular TEXT NOT NULL
    )
  `);

  db2.run(`
    CREATE TABLE IF NOT EXISTS Ejercicio (
      ID_Ejercicio INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_Grupo INTEGER NOT NULL,
      Nombre_ejercicio TEXT NOT NULL,
      FOREIGN KEY (ID_Grupo) REFERENCES Grupo_muscular(ID_Grupo)
    )
  `);

  db2.run(`
    CREATE TABLE IF NOT EXISTS Progreso (
      ID_Progreso INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_Usuario INTEGER NOT NULL,
      ID_Ejercicio INTEGER NOT NULL,
      Semana TEXT NOT NULL,
      Repeticiones INTEGER NOT NULL,
      Peso REAL NOT NULL,
      FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
      FOREIGN KEY (ID_Ejercicio) REFERENCES Ejercicio(ID_Ejercicio)
    )
  `);
});

module.exports = db2;