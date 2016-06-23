angular.module('app')
  .factory('FavoriteProductFactory', function(DS, SocketFactory){
    var factory = DS.defineResource({ 
      name: 'favoriteProduct',
      endpoint: 'favoriteProducts',
      relations: {
        belongsTo: {
          user: {
            localKey: 'userId',
            parent: true
          }
        }
      }
    });

    return factory;
  });
  
