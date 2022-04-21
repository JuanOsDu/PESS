const express = require("express");
const bonificacion = require("../models/bonificaciones_schema");
const router = express.Router();
const bonificacionSchema = require("../models/bonificaciones_schema");


router.post("/bonificaciones", (req, res) => {
    const bonificacion = bonificacionSchema(req.body);
    bonificacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/bonificaciones", (req, res) => {
    bonificacionSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/bonificaciones/:id", (req, res) => {
    const { id } = req.params;
    bonificacionSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.put("/bonificaciones/:id", (req, res) => {
    const { id } = req.params;
    const { descripcion, porcentaje } = req.params;
    bonificacionSchema
        .updateOne({ _id: id }, {
            $set: { descripcion, porcentaje }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.delete("/bonificaciones/:id", (req, res) => {
    const { id } = req.params;
    bonificacionSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;