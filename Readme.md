# 📘 Base de Datos con better-sqlite3

Este proyecto utiliza **SQLite** como base de datos y la librería [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) para interactuar con ella en Node.js.

El archivo principal encargado de configurar y manejar la base de datos es:

---

## 🔹 ¿Qué hace este archivo?

1. **Crea o abre** un archivo de base de datos llamado `database.sqlite`.
2. **Crea la tabla** `estudiantes` si aún no existe.
3. **Verifica si la tabla está vacía** y, si lo está, **inserta datos de ejemplo** (seed).
4. **Exporta la conexión** a la base de datos para que pueda usarse en otros módulos.

---

## 🔹 Explicación paso a paso

### 1. Crear/abrir la base de datos

```js
import Database from "better-sqlite3";

const db = new Database("database.sqlite");
```
