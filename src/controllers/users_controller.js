const mongoose = require('mongoose');
const userSchema = require('../models/users_schema');
const bcrypt = require('bcrypt');



const verificarCorreoUsuario = async(correo)=>{
try{
    const usuario = await userSchema.findOne({correo: correo});
    if(usuario){
        return true;
    }else{
        return false;
    }

}catch(err){
    throw new Error("Error en controlador verificarCorreoUsuario")
}
}

const crearUsuario = async(req)=>{
    try{
        const user = userSchema(req.body)
        req.body.contraseña = await bcrypt.hash(req.body.contraseña, 10);
        const usuario = await user.save().then((data)=>console.log(data)).catch((error)=>(console.log(error)));
        return usuario;



    }catch(err){
        throw new Error("Error en controlador crearUsuario");
    }
}


const loginUsuario = async(req)=>{
    try{
        const usuario = await userSchema.findOne({correo: req.body.correo}).catch((err)=>console.log(err));
        return await bcrypt.compare(req.body.contraseña, usuario.contraseña);

    }catch(err){
        throw new Error("Error en loginUsuario");
    }
}


module.exports = {verificarCorreoUsuario, crearUsuario, loginUsuario}