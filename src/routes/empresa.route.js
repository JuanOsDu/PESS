const router = require("express").Router();

const empresasC = require('../controllers/empresa_controller')

router.get('/empresas', async (req, res) => {
    try {

        const empresas = await empresasC.mostrarEmpresas();
        if (empresas) {
           return res.status(200).json({
                message: "Consulta exitosa",
                code: 1,
                empresas
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error ruta",
            code: -1
        })
    }




});

router.post('/empresas', async (req, res) => {
    try {
        const {nombre, gerente} = req.body;
        const campos = [
            {name: "nombre",
            value: nombre },
            {name: "gerente",
            value: gerente}
                ]
        const empty = campos.find((campo)=>{!campo.value});
        if(empty){
            return res.status(400).json({
            message:"No ingreso los campos necesarios",
                code: -1
            })
        }
        const empresa = empresasC.añadirEmpresa(req);
        if (empresa) {
            return res.status(200).json({ message: "Empresa creada exitosamente", code: 1, empresa });
        } else {
            return res.status(400).json({ message: "Error al crear empresa", code: -1 })
        }

    } catch (err) {
        return res.status(500).json({ message: "Error ruta", code: -1 });
    }
});


router.delete('/empresas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "No se envio el id de la empresa",
                code: -1
            })
        } else {
            const empresa = await empresasC.borrarEmpresa(id);
            if (empresa) {
                return res.status(200).json({
                    message: "Se elimino correctamente la empresa",
                    code: 1
                })
            } else {
                return res.status(400).json({
                    message: "No se pudo eliminar la empresa",
                    code: -1
                })
            }
        }


    } catch (err) {
        return res.status(500).json({ message: "Error ruta", code: -1 });
    }

})











module.exports = router;
