angular.module('app')
  .factory('UserFactory', function(DS, SocketFactory){
    var factory = DS.defineResource({ 
      name: 'user',
      endpoint: 'users',
      relations: {
        belongsTo: {
          department: {
            localKey: 'departmentId',
            parent: true
          }
        }
      }
    });

    SocketFactory.socket.on('user_change', function(message){
      console.log(message);
    });

    return factory;
  });
  
