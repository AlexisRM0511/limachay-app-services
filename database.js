const mongoose = require('mongoose');

const url = 'mongodb+srv://vetroyals:vetroyals@clustercolesroom.owdjh.mongodb.net/test'
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:true,useCreateIndex:true})
    .then(() => console.log('La Base de Datos esta conectada: '))
    .catch(error => console.error(error));

module.exports=mongoose;