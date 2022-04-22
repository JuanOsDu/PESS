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


const añadirEmpresa = async(req)=>{
try{

    const empresa = EmpresaSchema(req);
    const empresaS = await empresa.save().then((data)=>console.log(data)).catch((err)=>console.log(err));
    return empresaS

}catch(err){
    throw new Error("Error en añadir empresa");
}



}

module.exports = {mostrarEmpresas, añadirEmpresa}