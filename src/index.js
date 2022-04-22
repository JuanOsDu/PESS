const express = require("express");
const parser = require('body-parser');
const app = express();
const port = 3000;
const nominaRoutes = require("./routes/nomina_route");
const boificacionesRoutes = require("./routes/bonificaciones_route");
const empleadoRoutes = require("./routes/empleados_route");
const mongoose = require("mongoose");
const { application } = require("express");
require('dotenv').config();

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use("/api", nominaRoutes);
app.use("/api", boificacionesRoutes);
app.use("/api", empleadoRoutes);
app.use('/api', require('./routes/users_routes'));
app.use('/api',require('./routes/empresa.route') )
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexion exitosa"))
  .catch((error) => console.log(error));

console.clear();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});