const mongoose = require('mongoose')
const {Schema} = require("mongoose");

module.exports = mongoose.model('sue', new Schema({
    user: { type: String },
    date: { type: Date },
    status: { type: String },
    description: { type: String },
    photo: { type: String }
}));