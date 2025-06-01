const express = require("express");
const usersRouter = require("./routes/userController");
const productosRouter = require("./routes/productosController");
const categoriasRouter = require("./routes/categoriasController");
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const logPath = path.join(__dirname, "api_requests.log");
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}\n`;
  fs.appendFile(logPath, log, (err) => {
    if (err) {
      console.error("Error al escribir en el log:", err);
    }
  });
  next();
});
app.use("/api", usersRouter);
app.use("/api", productosRouter);
app.use("/api", categoriasRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
