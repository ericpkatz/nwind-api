angular.module('app')
  .factory('UserFactory', function(DS){
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
    return factory;
  });
  
