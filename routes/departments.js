var express = require('express');
var router = express.Router();
var Model = require('../db').models.Department;
var Product = require('../db').models.Product;
var FavoriteProduct = require('../db').models.FavoriteProduct;
var User = require('../db').models.User;

var include = [
    {
      model: Model,
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

router.get('/', function(req, res, next) {
  Model.findAll()
    .then(function(items){
      res.send(items);
    }, next);
});

router.get('/:id', function(req, res, next) {
  Model.findById(req.params.id)
    .then(function(item){
      res.send(item);
    }, next);
});

router.put('/:id', function(req, res, next) {
  Model.findById(req.params.id)
    .then(function(item){
      item.name = req.body.name;
      item.priority = req.body.priority * 1;
      return item.save();
    })
    .then(function(item){
      res.send(item);
    }, next)
});

router.get('/:id/users', function(req, res, next) {
  User.findAll({
    where: { departmentId: req.params.id },
    include: include
  })
    .then(function(items){
      res.send(items);
    }, next);
});

router.post('/:id/employees', function(req, res, next) {
  User.create(req.body)
    .then(function(user){
      res.send(user);
    });
});

router.put('/:departmentId/employees/:id', function(req, res, next) {
  User.update(req.body, { id: req.params.id })
    .then(function(user){
      res.send(user);
    });
});

router.delete('/:departmentId/users/:id', function(req, res, next) {
  User.destroy({ where: { id: req.params.id }})
    .then(function(){
      res.send({});
    });
});
router.use('/:departmentId/users', require('./users')); 

module.exports = router;
