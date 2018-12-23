const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER=require('../models/user.model.js');

// Create and Save a new Note
exports.create = (req, res) => {

  bcrypt.hash(req.body.password,10,function(err,hash)
  {
        // Create a Note
    const user = new USER({
        username: req.body.username,
        password: hash
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
  }
)
};

exports.find=(req, res)=>{
    USER.findOne({username:req.body.username})
    .then(function(user) {
        bcrypt.compare(req.body.password, user.password, function(err, result){

           if(err) {
              return res.status(401).json({
                 failed: 'Unauthorized Access'
              });
           }
           if(result) {
            const JWTToken = jwt.sign({
                username: user.username
            },
             'secret',
                {
                   expiresIn: '2h'
                });
             return res.status(200).json({
                success: 'Welcome to the JWT Auth',
                token: JWTToken,
                username: user.username
             });
           }
           return res.status(401).json({
              failed: 'Unauthorized Access'
           });
        });
     })
     .catch(error => {
        res.status(500).json({
           error: error
        });
     });;
}