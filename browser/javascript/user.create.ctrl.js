angular.module('app')
  .controller('UserCreateCtrl', function($state, $scope, UserFactory){
    $scope.model = {
      departmentId: 1
    };
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
            //TODO
          };

          $scope.save = function(){
            UserFactory.create($scope.model)
              .then(function(user){
                $state.go('users');
              });
          };
  });
