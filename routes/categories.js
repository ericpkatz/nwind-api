var express = require('express');
var router = express.Router();
var Category = require('../db').models.Category;
var Product = require('../db').models.Product;

router.get('/', function(req, res, next) {
  Category.findAll()
    .then(function(categories){
      res.send(categories);
    }, next);
});

router.get('/:id', function(req, res, next) {
  Category.findById(req.params.id)
    .then(function(category){
      res.send(category);
    }, next);
});

router.get('/:id/products', function(req, res, next){
  Product.findAll(
      { where: { categoryId: req.params.id }}
  )
    .then(function(products){
      res.send(products);
    }, next);

});

module.exports = router;
