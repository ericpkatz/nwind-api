var express = require('express');
var router = express.Router();
var User = require('../db').models.User;
var FavoriteProduct = require('../db').models.FavoriteProduct;
var Product = require('../db').models.Product;
var jwt = require('jwt-simple');

router.get('/:hash', function(req, res, next) {
  var token = jwt.decode(req.params.hash, 'foobar');
  User.findById(token.id)
    .then(function(user){
      res.send(user);
    });
});

router.post('/', function(req, res, next) {
  User.findOne({ where: { email: req.body.email }})
    .then(function(user){
      if(user && user.password === user.encryptPassword(req.body.password))
        return user;
      throw next({ status: 401 });
    })
    .then(function(user){
      var token = jwt.encode({ id: user.id }, 'foobar');
      res.send({ id: token});
    })
    .then(null, next);
});

module.exports = router;
