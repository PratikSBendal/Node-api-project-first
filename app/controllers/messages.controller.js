const Messages = require('../models/messages.model.js');

// var io = require('socket.io');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
   

    // Create a Note
    const message = new Messages({
        name: req.body.name || "Untitled Note", 
        message: req.body.message
    });

    // Save Note in the database
    message.save()
    .then(data => {
        res.send(data);
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.findAll = (req, res) => {
    Messages.find()
    .then(message => {
        res.send(message);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};