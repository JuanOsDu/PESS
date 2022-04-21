const mongoose = require("mongoose");

const empleadoSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    apellidos: {
        type: String,
        required: true
    },

    edad: {
        type: Number,
        required: true
    },

    telefono: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    cargo: {
        type: String,
        required: true
    },

    departamento: {
        type: String,
        required: true
    },  

    salario: {
        type: Number,
        required: true
    },
    
    nominas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nomina' }],
});
module.exports = mongoose.model('Empleado', empleadoSchema);