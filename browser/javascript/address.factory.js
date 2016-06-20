angular.module('app')
  .factory('AddressFactory', function(DS, SocketFactory){
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

    SocketFactory.socket.on('address_change', function(message){
      console.log(message);
      factory.inject(message);
    });
    return factory;
  });
  
