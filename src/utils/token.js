const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('access-token')
    if (!token) return res.status(401).json({ error: '¡Lo sentimos!, pero no tiene permisos para acceder a esta ruta.' })
    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next() 
    } catch (error) {
        res.status(400).json({ error: 'El token no es válido' })
    }
}

const generarToken= async(user) =>{
    const tokenGenerado = jwt.sign(
        {
        
        correo: user.correo,
        id: user._id,
        rol: user.rol
        },
        "" + process.env.SECRET,
        { expiresIn: '5h' }
    ); 
    return tokenGenerado;
}

module.exports = {verifyToken, generarToken};
