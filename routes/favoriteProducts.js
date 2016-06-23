var router = require('express').Router({mergeParams: true});
var models = require('../db').models;
var FavoriteProduct = models.FavoriteProduct;

router.get('/', function(req, res, next){
  FavoriteProduct.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: models.Product,
        as: 'product' 
      }
    ]
  })
  .then(function(favoriteProducts){
    res.send(favoriteProducts);
  });
});

router.post('/', function(req, res, next){
  FavoriteProduct.create({
    userId: req.params.userId,
    productId: req.body.productId
  })
  .then(function(favoriteProduct){
    res.send(favoriteProduct);
  });
});

router.delete('/:id', function(req, res, next){
  FavoriteProduct.destroy({
    where: {id: req.params.id}
  })
  .then(function(){
    res.sendStatus(204);
  });
});

module.exports = router;
