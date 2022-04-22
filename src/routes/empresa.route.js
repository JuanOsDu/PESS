const router = require("express").Router();

const empresasC = require('../controllers/empresa_controller')

router.get('/empresas', async (req, res) => {
    try {

        const empresas = await empresasC.mostrarEmpresas();
        if (empresas) {
            res.status(200).json({
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

router.post('/empresas', async(req, res)=>{
    
})











module.exports = router;