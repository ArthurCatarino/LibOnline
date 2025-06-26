require("dotenv").config({ path: "../variaveis.env" });
const db = require("./db");
const express = require("express");
const routes = require("./routes");

const server = express();
server.use(express.json());
server.use(routes);
db()



server.listen(process.env.PORT, () => {
  console.log("Server ligado na porta " + process.env.PORT );
});