const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear o conectar a la base de datos
const db = new sqlite3.Database(path.resolve(__dirname, 'dailyFit.db'), (err) => {
  if (err) return console.error('Error al conectar con SQLite:', err.message);
  console.log('Conectado a la base de datos SQLite ✅');
});

// Crear tablas si no existen
db.serialize(() => {

  db.run(`
      CREATE TABLE IF NOT EXISTS SesionEntrenamiento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Fecha DATE NOT NULL,
        Notas TEXT
      )
    `);

  db.run(`
      CREATE TABLE IF NOT EXISTS EjercicioAux (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_sesionEntrenamiento INTEGER NOT NULL UNIQUE,
        id_ejercicio INTEGER NOT NULL UNIQUE
      )
    `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Ejercicio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_Grupo INTEGER,
      nombre TEXT NOT NULL,
      FOREIGN KEY (id_Grupo) REFERENCES GrupoMuscular(id)
    )
    `);

  db.run(`
    CREATE TABLE IF NOT EXISTS GrupoMuscular (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    )
  `);

  db.run(`
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

    db.run(`
    CREATE TABLE IF NOT EXISTS Usuario (
      ID_Usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      Genero TEXT NOT NULL,
      Edad INTEGER NOT NULL,
      Telefono TEXT,
      Correo TEXT UNIQUE
    )
  `);

});

module.exports = db;