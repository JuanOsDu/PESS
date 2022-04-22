const router = require("express").Router();
const userC = require('../controllers/users_controller')
const token  = require('../utils/token')

router.post('/login', async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        const login = await userC.loginUsuario(req);
        if (login) {
            const tokn = await token.generarToken(login);
            return res.status(200).json({
                message: "Bienvenido a PESS",
                code: 1,
                toke: tokn
            })
        } else {
            return res.status(400).json({
                message: "No se pudo acceder al sistema, revise credenciales",
                code: -2
            })
        }




    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error en incio de sesion",
            code: -1
        })
    }
})




router.post('/usuario', async (req, res) => {
    try {
        let { correo, contraseña, rol } = req.body;
        if (await userC.verificarCorreoUsuario(correo)) {
            return res.status(400).json({
                message: "Esta correo ya se encuentra registrado",
                code: -2
            });
        } else {
            let usuario = await userC.crearUsuario(req);
           
            if (usuario) {
                res.status(200).json({
                    message: "Se creo el usuario satisfactoriamente",
                    code: 1
                })

            } else {
                return res.status(400).json({
                    message: "Error al crear el usuario",
                    code: -1
                })
            }
        }





    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error en crear usuario",
            code: -1
        })
    }



})










module.exports = router;