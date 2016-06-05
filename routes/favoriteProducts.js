var router = require('express').Router({mergeParams: true});
var FavoriteProduct = require('../db').models.FavoriteProduct;

router.get('/', function(req, res, next){
  FavoriteProduct.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(function(favoriteProducts){
    res.send(favoriteProducts);
  });
});

router.post('/', function(req, res, next){
  FavoriteProduct.create({
    userId: req.params.userId,
    productId: req.params.productId
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
