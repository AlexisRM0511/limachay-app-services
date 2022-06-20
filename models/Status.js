const mongoose = require('mongoose')
const {Schema} = require("mongoose")

module.exports = mongoose.model('status', new Schema({
    name: {type: String}
}))