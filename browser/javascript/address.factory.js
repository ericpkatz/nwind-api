angular.module('app')
  .factory('AddressFactory', function(DS){
    var factory = DS.defineResource({ 
      name: 'address',
      endpoint: 'addresses',
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
  
