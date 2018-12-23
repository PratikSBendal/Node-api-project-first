module.exports = (app) => {
    const table = require('../controllers//predefine.controller.js');
    // Create a new Note
    app.post('/predefine', table.create);

    // Retrieve all Notes
    app.get('/predefine', table.findAll);

    // Retrieve a single Note with noteId
    app.get('/predefine/:tableId', table.findOne);

    // Update a Note with noteId
    app.put('/predefine/:tableId', table.update);

    // Delete a Note with noteId
    app.delete('/predefine/:tableId', table.delete);


}
