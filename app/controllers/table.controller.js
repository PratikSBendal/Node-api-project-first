const Table = require('../models/table.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
  
    // Create a Note
    const table = new Table({
        name: req.body.name,
        age: req.body.age,
        website: req.body.website
    });

    // Save Note in the database
    table.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Table.find()
    .then(table => {
        res.send(table);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


// Find a single note with a noteId

exports.findOne= (req, res) =>
{
    Table.findById(req.params.tableId)
    .then(table=>{
        if(!table)
        {
            return res.status(400).send({
                message: "Note not found with id " + req.params.tableId
            })
        }
        res.send(table);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.tableId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.tableId
        });
    });
};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // Find note and update it with the request body
    Table.findByIdAndUpdate(req.params.tableId, {
        name: req.body.name,
        age: req.body.age,
        website: req.body.website
    }, {new: true})
    .then(table => {
        if(!table) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.tableId
            });
        }
        res.send(table);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.tableId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.tableId
        });
    });
};



// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Table.findByIdAndRemove(req.params.tableId)
    .then(table => {
        if(!table) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.tableId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.tableId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.tableId
        });
    });
};