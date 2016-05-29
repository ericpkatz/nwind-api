angular.module('app')
  .factory('SessionFactory', function(DS){
    var factory = DS.defineResource({
      name: 'session',
      endpoint: 'sessions'
    });

    factory.auth = {
    };

    return factory;

  });
