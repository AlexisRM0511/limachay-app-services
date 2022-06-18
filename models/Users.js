const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    typeUser: { type: String },
    dni: { type: Number },
    status : { type: Number }
})

module.exports = mongoose.model('users', usersSchema)