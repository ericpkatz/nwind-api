angular.module('app')
  .factory('SimilarUserFactory', function(DS, SocketFactory){
    var factory = DS.defineResource({ 
      name: 'similar_user',
      endpoint: 'similar_users',
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
  
