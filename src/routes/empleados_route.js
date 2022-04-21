const express = require("express");
const employe = require("../models/empleados_shema");
const router = express.Router();
const empleadoSchema = require("../models/empleados_shema");
const nominaSchema = require("../models/nomina_schema");

router.post("/empleado", (req, res) => {
    const employee = empleadoSchema(req.body);
    employee
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/empleado", (req, res) => {
    empleadoSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/empleado/:id", (req, res) => {
    const { id } = req.params;
    empleadoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/empleado/:id", async (req, res) => {
    const { id } = req.params;
    const nomina = nominaSchema(req.body);
    var idNomina = null;

    const consultaNomina = await nominaSchema.findOne({ numero_cheque: req.body.numero_cheque });
    if (!consultaNomina) {
        await nomina.save().then((dataNomina) => {
            idNomina = dataNomina._id;
        });
    } else {
        idNomina = consultaNomina._id;
        empleadoSchema
            .updateOne({ _id: id }, {
                $addToSet: { nominas: idNomina } 
            })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    }
});
router.delete("/empleado/:id", (req, res) => {
    const { id } = req.params;
    empleadoSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;