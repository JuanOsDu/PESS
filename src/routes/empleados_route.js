const express = require("express");
const bonificaciones_schema = require("../models/bonificaciones_schema");
const empleados_shema = require("../models/empleados_shema");

const employe = require("../models/empleados_shema");
const router = express.Router();
const empleadoSchema = require("../models/empleados_shema");
const nominaSchema = require("../models/nomina_schema");




router.get("/calcular-nomina/:id_nomina/:id_empleado", async (req, res) => {
    try {
        const { id_nomina, id_empleado } = req.params;
        if (!id_nomina || !id_empleado) {
            return res.status(400).json({
                message: "No envio los parametros de identificacion",
                code: -1
            });
        }
        let nomina;
        await nominaSchema
            .find({ _id: id_nomina })
            .then((data) => { nomina = data[0] })
            .catch((error) => res.json({ message: error }));
        let empleado;
        await empleadoSchema.find({ _id: id_empleado })
            .then((data) => { empleado = data[0] })
            .catch((error) => res.json({ message: error }));

        let relacion = empleado.nominas.find((campo) => (campo == id_nomina)).toString();

        if (!nomina || !empleado || !relacion) {
            return res.status(400).json({
                message: "No existen nominas relacionadas",
                code: -1
            });
        }
        var monto = 0;
        monto += parseInt(empleado.salario);
        let nom = nomina.bonificaciones.toString().split(",")
      
        for (let i = 0; i < nom.length; i++) {
            let id_bonificacion = nom[i].toString();
            let bonificacionData;
            await bonificaciones_schema.find({ _id: id_bonificacion })
                .then((data) => { bonificacionData = data[0] })
                .catch((error) => res.json({ message: error }));

            monto += (bonificacionData.tipo == 1 ? (empleado.salario * (bonificacionData.porcentaje / 100)) : (empleado.salario * (bonificacionData.porcentaje / -100)));



        }

    
        return res.status(200).json({
            message: "Calculo de nomina exitoso",
            monto,
            code: 1
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error al calcular nomina",
            code: -1
        })
    }
})
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