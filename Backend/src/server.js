require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("Server ligado na porta " + PORT);
});
