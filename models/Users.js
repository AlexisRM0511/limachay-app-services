const mongoose = require('mongoose')
const {Schema} = require("mongoose")

module.exports = mongoose.model('users', new Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    typeUser: { type: String },
    dni: { type: Number },
    status : { type: Number }
}))