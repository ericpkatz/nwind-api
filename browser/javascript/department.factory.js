angular.module('app')
  .factory('DepartmentFactory', function(DS){
    var factory = DS.defineResource({
      name: 'department',
      endpoint: 'departments'
    });
    return factory;
  });
