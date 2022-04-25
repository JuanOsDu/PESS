const express = require("express");
const nomina = require("../models/nomina_schema");
const router = express.Router();
const nominaSchema = require("../models/nomina_schema");
const bonificacionSchema = require("../models/bonificaciones_schema");
const empleadosSchema = require("../models/empleados_shema");
//const deduccionSchema = require("../models/deduccion_model");

router.post("/nomina", (req, res) => {
    const nomina = nominaSchema(req.body);
    nomina
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error })); 
});

router.get("/nomina", (req, res) => {
    nominaSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/nomina/:id", (req, res) => {
    const { id } = req.params;
    nominaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/nomina/:id", async (req, res) => {
    const { id } = req.params;
    const bonificacion = bonificacionSchema(req.body);
    var idBoni = null;

    const consultaBonificacion = await bonificacionSchema.findOne({ codigo: req.body.codigo });
    if (!consultaBonificacion) {
        await bonificacion.save().then((dataBonificacion) => {
            idBoni = dataBonificacion._id;
        });
    } else {
        idBoni = consultaBonificacion._id;
    }

    nominaSchema
        .updateOne({ _id: id }, {
            $addToSet: { bonificaciones: idBoni }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.delete("/nomina/:id", (req, res) => {
    const { id } = req.params;
    nominaSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;