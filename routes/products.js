var express = require('express');
var router = express.Router();
var Product = require('../db').models.Product;
var Category = require('../db').models.Category;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Product.findAll({
    include: {
      model: Category,
      as: 'category'  
    }
  })
    .then(function(products){
      res.send(products);
    });
});

router.get('/:id', function(req, res, next) {
  Product.findById(req.params.id)
    .then(function(product){
      res.send(user);
    });
});

module.exports = router;
