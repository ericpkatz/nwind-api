angular.module('app')
  .controller('LoginCtrl', function($scope, SessionFactory, $state){
    $scope.login = function(form){
      $scope.$broadcast('schemaFormValidate'); 
      if(form.$valid)
        SessionFactory.login($scope.model)
          .then(function(){
            $state.go('departments');
          });
    };
    $scope.schema = SessionFactory.schema;
    $scope.form = SessionFactory.form;
    $scope.model = { };
  });
