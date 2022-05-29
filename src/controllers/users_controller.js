const mongoose = require('mongoose');
const userSchema = require('../models/users_schema');
const bcrypt = require('bcrypt');
const { stringify } = require('nodemon/lib/utils');



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
        req.body.contraseña = await bcrypt.hash(`${req.body.contraseña}`, 10);
   
        const user = userSchema(req.body)
      

        const usuario = await user.save().then((data)=>{return data}).catch((error)=>(console.log(error)));
        return usuario;



    }catch(err){
        throw new Error("Error en controlador crearUsuario");
    }
}

const loginUsuario = async(req)=>{
    try{
        const usuario = await userSchema.findOne({correo: req.body.correo}).then((data)=>{return data}).catch((err)=>console.log(err));
        const pass =req.body.contraseña;
        const passh =  usuario.contraseña;
      
        const resp = await bcrypt.compare(pass, passh);
        return resp;
    }catch(err){
        throw new Error("Error en loginUsuario");
    }
}


module.exports = {verificarCorreoUsuario, crearUsuario, loginUsuario}