module.exports = (app) => {
    const table = require('../controllers/table.controller.js');
    // Create a new Note
    app.post('/table', table.create);

    // Retrieve all Notes
    app.get('/table', table.findAll);

    // Retrieve a single Note with noteId
    app.get('/table/:tableId', table.findOne);

    // Update a Note with noteId
    app.put('/table/:tableId', table.update);

    // Delete a Note with noteId
    app.delete('/table/:tableId', table.delete);


}
