const mongoose = require('mongoose');
const messagesSchema=mongoose.Schema({
    name: String,
    message : String
},
{ collection: 'messages' });
module.exports = mongoose.model('Messages',messagesSchema)