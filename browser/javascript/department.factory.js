angular.module('app')
  .factory('DepartmentFactory', function($http){
    return {
      fetchAll: function(){
        return $http.get('/api/departments')
          .then(function(response){
            return response.data;
          });
      }
    };
  });
