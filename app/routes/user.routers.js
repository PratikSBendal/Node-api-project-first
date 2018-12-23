module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    // Create a new Note
    app.post('/user', user.create);  
    app.post('/signin',user.find)

}
