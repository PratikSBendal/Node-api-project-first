module.exports = (app) => {
    const messages = require('../controllers/messages.controller.js');
    // Create a new Note
    app.post('/messages', messages.create);

  // Retrieve all Notes
  app.get('/messages', messages.findAll);

}
