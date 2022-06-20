const mongoose = require('mongoose')
const {Schema} = require("mongoose")

module.exports = mongoose.model('typeUsers', new Schema({
    name: {type: String}
}));