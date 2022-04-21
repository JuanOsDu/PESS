const mongoose = require("mongoose");

const bonificacionSchema = mongoose.Schema({

    codigo: {
        type: String,
        required: true
    },

    tipo: {
        type: Number,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    porcentaje: {
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('Bonificacion', bonificacionSchema);