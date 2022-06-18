const mongoose = require('mongoose')

const typeUserSchema = mongoose.Schema({
    name: { type: String }
})

module.exports = mongoose.model('typeusers', typeUserSchema)