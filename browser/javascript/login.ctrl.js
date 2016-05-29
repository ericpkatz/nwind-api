angular.module('app')
  .controller('LoginCtrl', function($scope, SessionFactory, $http, $window){
          $scope.login = function(form){
            $scope.$broadcast('schemaFormValidate'); 
            if(form.$valid)
              SessionFactory.create($scope.model)
                .then(function(session){
                  $window.sessionStorage.setItem('token', session.id); 
                  return $http.get('/api/sessions/' + $window.sessionStorage.getItem('token')); 
                })
                .then(function(response){
                  angular.copy(response.data, SessionFactory.auth);
                });
          };
          $scope.schema = {
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
          $scope.form = [
            '*',
            {
              type: 'submit',
              title: 'Login'
            
            }
          ];
          $scope.model = {
          
          };
  });
