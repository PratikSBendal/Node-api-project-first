const mongoose = require('mongoose');
const tableSchema=mongoose.Schema({
    name: String,
    age: Number,
    website: String
},
    {
        timestamps: true
    });
module.exports = mongoose.model('Table',tableSchema);
