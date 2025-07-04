const mysql = require("mysql2");
require("dotenv").config({ path: "../variaveis.env" });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

if (process.env.NODE_ENV !== "test") {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Erro ao conectar ao banco:", err.message);
    } else {
      console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`);
      conn.release();
    }
  });
}

module.exports = pool;
