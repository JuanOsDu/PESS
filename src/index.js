const express = require('express');
const app = express();
app.use(express.json());



app.use('/api', require('./routes/empleados.routes'));

app.listen(3000, ()=>{
    console.log(`listen on 3000`);
})