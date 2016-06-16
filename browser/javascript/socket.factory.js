angular.module('app')
  .factory('SocketFactory', function($window){
    var socket = $window.io();
    return {
      socket: socket
    };
  })
  .run(function(SocketFactory){
  
  });
