var express = require('express');
var router = express.Router();
var Category = require('../db').models.Category;

router.get('/', function(req, res, next) {
  Category.findAll()
    .then(function(categories){
      res.send(categories);
    }, next);
});

module.exports = router;
