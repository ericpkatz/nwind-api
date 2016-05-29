angular.module('app')
  .factory('SessionFactory', function(DS, $window, $http){
    var factory = DS.defineResource({
      name: 'session',
      endpoint: 'sessions'
    });

    factory.login = function(credentials){

      return this.create(credentials)
        .then(function(session){
          $window.sessionStorage.setItem('token', session.id); 
          return $http.get('/api/sessions/' + $window.sessionStorage.getItem('token')); 
        })
        .then(function(response){
          angular.copy(response.data, factory.auth);
        });
    };

    factory.auth = {
    };

    factory.schema = {
      type: 'object',
      properties: {
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        } 
      },
      required: ['email', 'password']
    
    };

    factory.form = [
      '*',
      {
        type: 'submit',
        title: 'Login'
      
      }
    ];

    return factory;

  });
