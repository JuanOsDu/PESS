const express = require("express");
const parser = require('body-parser');
const app = express();
const port = 3000;
const nominaRoutes = require("./routes/nomina_route");
const boificacionesRoutes = require("./routes/bonificaciones_route");
const empleadoRoutes = require("./routes/empleados_route");
const mongoose = require("mongoose");
const { application } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexion exitosa"))
  .catch((error) => console.log(error));


app.use('/api', require('./routes/users_routes'));

app.use(function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      code: -3,
      error: 'No está autorizado para realizar esta acción'
    });
  } else {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRETPRIVATEKEY, function (err, user) {
      if (err) {
        return res.status(403).json({
          code: -3,
          error: 'No está autorizado para realizar esta acción'
        });
      } else {
        next();
      }
    });
  }

});
app.use("/api", nominaRoutes);
app.use("/api", boificacionesRoutes);
app.use("/api", empleadoRoutes);
app.use('/api',require('./routes/empresa.route') )
console.clear();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});