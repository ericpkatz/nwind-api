var express = require('express');
var router = express.Router();
var User = require('../db').models.User;
var Product = require('../db').models.Product;
var Department = require('../db').models.Department;

var include = [
    {
      model: Product,
      as: 'favoriteProduct'
    },
    {
      model: Product,
      as: 'secondFavoriteProduct'
    },
    {
      model: Product,
      as: 'leastFavoriteProduct'
    },
    {
      model: Department,
      as: 'department'
    }
  ];
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll({
    include: include
  })
    .then(function(users){
      res.send(users);
    });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, {
    include: include
  })
    .then(function(user){
      res.send(user);
    });
});

module.exports = router;
