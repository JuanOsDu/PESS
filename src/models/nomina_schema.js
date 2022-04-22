const mongoose = require("mongoose");

const nominaSchema = mongoose.Schema({

    numero_cheque: {
        type: Number,
        required: true
    },

    fecha_inicio_pago: {
        type: Date,
        required: true
    },

    fecha_fin_pago: {
        type: Date,
        required: true
    },

     bonificaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bonificacion' }],

     monto: {
         type: Number
 }


});
module.exports = mongoose.model('Nomina', nominaSchema);
/*{
    "numero_cheque": "2",

    "fecha_inicio_pago": "04/05/2003",

    "fecha_fin_pago": "04/05/2022",

    "deducciones": [],

    "bonificaciones": []
}*/