const mongoose = require('mongoose');
const SpecializationSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: String,
}, { _id: false });

module.exports = mongoose.model('specializations', SpecializationSchema);