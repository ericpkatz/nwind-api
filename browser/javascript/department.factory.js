angular.module('app')
  .factory('DepartmentFactory', function($http, DS){
    var factory = DS.defineResource('departments');
    return factory;
  });
