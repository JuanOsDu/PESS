const mongoose = require("mongoose");

const EmpresaSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    gerente: {
        type: String,
        required: true
    },

    empleados:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

});
module.exports = mongoose.model('Empresa', EmpresaSchema);