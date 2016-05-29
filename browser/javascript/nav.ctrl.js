angular.module('app')
  .controller('NavCtrl', function($scope, SessionFactory, $window){
    $scope.auth = SessionFactory.auth; 
    $scope.logout = function(){
      angular.copy({}, SessionFactory.auth);
      $window.sessionStorage.removeItem('token');
    };
  });
