const mongoose = require('mongoose');

const motorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    state: Number
});

module.exports = mongoose.model('motor', motorSchema);