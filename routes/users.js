var express = require('express');
var router = express.Router();
var User = require('../db').models.User;
var Product = require('../db').models.Product;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll({
    include: [
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
      }
    ]
  })
    .then(function(users){
      res.send(users);
    });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, {
    include: [
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
      }
    ]
  })
    .then(function(user){
      res.send(user);
    });
});

module.exports = router;
