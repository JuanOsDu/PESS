const mongoose = require('mongoose');
const EmpresaSchema = require('../models/empresa_schema');




const mostrarEmpresas = async()=>{
try{
    const empresas = await EmpresaSchema.find();
    if(empresas){
        return empresas
    }else{
        return null;
    }
}catch(err){
    throw new Error("Error en mostrarEmpresas");
}




}


module.exports = {mostrarEmpresas}