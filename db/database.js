import Database from "better-sqlite3";

//Creamos una instancia de Database y especificamos el nombre del archivo de la base de datos
//Si ese archivo no existe se crea en este momento
//El objeto db representa la conexion a la base de datos y lo vamos a usar para ejecutar las queries
const db = new Database("database.sqlite");

//"prepare" es un metodo del objeto db y nos devuelve un objeto que representa la query, ese objeto nos da metodos como .run() el cual se usa para INSERT, UPDATE o DELETE (queries que no devuelven filas)
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS estudiantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`
).run();

// Al inicio nuestra tabla esta vacia asi que le añadimos informacion
// .get() nos devuelve un objeto, algo parecido a esto => { count: 3 }, que nos indica cuentas filas tiene nuestra tabla, lo cual usamos para evaluar si es cero
const count = db
  .prepare("SELECT COUNT(*) AS count FROM estudiantes")
  .get().count;
if (count === 0) {
  const insert = db.prepare(
    "INSERT INTO estudiantes (name, age) VALUES (?, ?)"
  );
  insert.run("Tomas", 21);
  insert.run("Aron", 23);
  insert.run("Connor", 31);
  console.log("🟢 Seeded students table");
}

export default db;
