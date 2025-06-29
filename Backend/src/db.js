const mysql = require("mysql2");
require("dotenv").config({ path: "../variaveis.env" });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: 'utf8mb4'
  
});
connection.connect((error) => {
  if (error) throw error;
  console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`);
});

module.exports = connection;