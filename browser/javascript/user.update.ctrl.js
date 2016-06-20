angular.module('app')
  .controller('UserUpdateCtrl', function($state, $scope, UserFactory, user){
    $scope.model = user; 
          $scope.form = [
            "email",
            "password",
            "firstName",
            "lastName",
            "departmentId",
            {
              "type": "submit",
              "style": "btn-info",
              "title": "OK"
            },
            {
              "type": "button",
              "style": "btn",
              "title": "Cancel",
              "onClick": "cancel()"
            }
          ];
          $scope.schema = {
            "type": "object",
            "title": "Department",
            "properties": {
              "email": {
                "type": "string"
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "password": {
                "type": "string"
              },
              "departmentId": {
                "type": "integer"
              }

            },
            "required": [
              "email", 'firstName', 'lastName', 'password'
            ]
          }; 

          $scope.cancel = function(){
            $scope.model = angular.copy(department);
          };

          $scope.save = function(){
            UserFactory.update($scope.model.id, $scope.model)
              .then(function(){
                $state.go('users');
              });
          };
  });
