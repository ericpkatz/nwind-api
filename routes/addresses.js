var router = require('express').Router({mergeParams: true});
var Address = require('../db').models.Address;

router.get('/', function(req, res, next){
  Address.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(function(address){
    res.send(address);
  });
});

router.post('/', function(req, res, next){
  var address = req.body;
  address.userId = req.params.userId;
  Address.create(address)
  .then(function(address){
    res.send(address);
  });
});

router.delete('/:id', function(req, res, next){
  Address.destroy({
    where: {id: req.params.id}
  })
  .then(function(){
    res.sendStatus(204);
  });
});

module.exports = router;
