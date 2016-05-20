var express = require('express');
var router = express.Router();
var User = require('../db').models.User;

router.post('/', function(req, res, next) {
  User.findOne({ where: { email: req.body.email }})
    .then(function(user){
      if(user && user.password === user.encryptPassword(req.body.password))
        return user;
      throw next({ status: 401 });
    })
    .then(function(user){
      //TODO send back a JWT token
      res.send(user);
    })
    .then(null, next);
});

module.exports = router;
