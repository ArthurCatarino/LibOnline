require("dotenv").config({ path: "../variaveis.env" });
const express = require("express");
const routes = require("./routes");

const server = express();
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT, () => {
  console.log("Server ligado na porta " + process.env.PORT );
});