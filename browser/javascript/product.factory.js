angular.module('app')
  .factory('ProductFactory', function(DS){
    var factory = DS.defineResource({
      name: 'product',
      endpoint: 'products',
      relations: {
        belongsTo: {
          category: {
            parent: true,
            localKey: 'categoryId'
          }
        }
      }
    });
    return factory;
  
  });
