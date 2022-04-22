const mongoose = require('mongoose');
const EmpresaSchema = require('../models/empresa_schema');




const mostrarEmpresas = async () => {
    try {
        const empresas = await EmpresaSchema.find().then((data)=>{return data}).catch((err)=>console.log(err));
        if (empresas) {
            return empresas
        } else {
            return null;
        }
    } catch (err) {
        throw new Error("Error en mostrarEmpresas");
    }




}
const borrarEmpresa = async (id) => {
    try {
        const empresa = await EmpresaSchema.remove({ _id: id }).then((data) => {
            console.log(data)
            return data
        }
        ).catch((err) => {
            console.log(err)
            return null
        })
        return empresa;
    } catch (err) {
        throw new Error("Error en borrarEmpresa")
    }
}

const añadirEmpresa = async (req) => {
    try {

        const empresa = EmpresaSchema(req.body);
        const empresaS = await empresa.save().then((data) => console.log(data)).catch((err) => console.log(err));
        return empresaS

    } catch (err) {
        throw new Error("Error en añadir empresa");
    }



}

module.exports = { mostrarEmpresas, añadirEmpresa, borrarEmpresa }