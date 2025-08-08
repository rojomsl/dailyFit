const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear o conectar a la base de datos
const db = new sqlite3.Database(path.resolve(__dirname, 'dailyFit.db'), (err) => {
  if (err) return console.error('Error al conectar con SQLite:', err.message);
  console.log('Conectado a la base de datos SQLite ✅');
});

db.run("PRAGMA foreign_keys = ON"); 

// Crear tablas si no existen
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS SesionEntrenamiento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_Usuario INTEGER,
      fecha DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
      notas TEXT,
      FOREIGN KEY (id_Usuario) REFERENCES Usuario(id)
    )
    `);
  
   db.run(`
    CREATE TABLE IF NOT EXISTS EjercicioAux (
      id INTEGER PRIMARY KEY,
      id_SesionEntrenamiento INTEGER,
      id_Ejercicio INTEGER,
      num_serie INTEGER,
      FOREIGN KEY (id_SesionEntrenamiento) REFERENCES SesionEntrenamiento(id),
      FOREIGN KEY (id_Ejercicio) REFERENCES Ejercicio(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Serie (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_EjercicioAux INTEGER,  
      peso REAL NOT NULL,
      repeticiones INTEGER NOT NULL,
      orden INTEGER,    
      FOREIGN KEY (id_EjercicioAux) REFERENCES EjercicioAux(id)
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS Usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      genero TEXT NOT NULL,
      edad INTEGER NOT NULL,
      telefono TEXT,
      correo TEXT UNIQUE
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

});

module.exports = db;