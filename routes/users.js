var express = require('express');
var router = express.Router();
var User = require('../db').models.User;
var Product = require('../db').models.Product;
var FavoriteProduct = require('../db').models.FavoriteProduct;
var Department = require('../db').models.Department;
var include = [
    {
      model: Department,
      as: 'department'
    },
    {
      model: FavoriteProduct,
      as: 'favoriteProducts',
      include: [{
        model: Product,
        as: 'product'
      }]
    },
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

router.post('/', function(req, res, next) {
  User.create(req.body)
    .then(function(user){
      res.send(user);
    });
});

router.put('/:id', function(req, res, next) {
  console.log(req.body);
  User.update(req.body, { where: { id: req.params.id}})
    .then(function(user){
      return User.findById(req.params.id);
    })
    .then(function(user){
      res.send(user);
    });
});

router.delete('/:id', function(req, res, next) {
  User.destroy({ where: { id: req.params.id}})
    .then(function(user){
      return res.sendStatus(204);
    })
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, {
    include: include
  })
    .then(function(user){
      res.send(user);
    });
});

router.use('/:userId/favoriteProducts', require('./favoriteProducts')); 
router.use('/:userId/addresses', require('./addresses')); 

module.exports = router;
