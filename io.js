var _io;
module.exports = {
  set: function(server){
    _io = require('socket.io')(server);
    _io.on('connection', function(socket){
      console.log('new user connected');
    });
  },
  get: function(){
    return _io;
  },
  broadcast: function(name, msg){
    console.log('BROADCAST', name, msg);
    if(_io){
      _io.emit(name, msg);
    }
  }
};
