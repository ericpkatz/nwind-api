angular.module('app')
  .factory('DepartmentFactory', function(DS, SocketFactory){
    var factory = DS.defineResource({
      name: 'department',
      endpoint: 'departments'
    });

    SocketFactory.socket.on('department_change', function(message){
      factory.refreshAll();
    });

    return factory;
  })
  .run(function(DepartmentFactory){
  
  });
