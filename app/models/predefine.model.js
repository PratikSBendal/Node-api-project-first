const mongoose = require('mongoose');
const predefineSchema=mongoose.Schema({
    name: String,
    age: Number
},
{ collection: 'predefine' });
module.exports = mongoose.model('Predefine',predefineSchema)




