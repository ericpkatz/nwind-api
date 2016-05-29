angular.module('app')
  .controller('DepartmentEditCtrl', function($state, $scope, department, DepartmentFactory){
          $scope.form = [
            "name",
            "priority",
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
              "name": {
                "title": "Name",
                "type": "string"
              },
              "priority": {
                "title": "Priority",
                "type": "integer",
                "minimum": 1,
                "maximum": 15
              }
            },
            "required": [
              "name"
            ]
          }; 

          $scope.model = angular.copy(department);

          $scope.cancel = function(){
            $scope.model = angular.copy(department);
          };

          $scope.save = function(){
            DepartmentFactory.update(department.id, $scope.model )
              .then(function(){
                $state.go('departments');
              });
          };
  });
