angular.module('app')
  .factory('CategoryFactory', function(DS){
    var factory = DS.defineResource({
      name: 'category',
      endpoint: 'categories'
    });
    return factory;
  });
