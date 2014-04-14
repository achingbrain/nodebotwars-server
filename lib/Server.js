var DNode = require('dnode'),
  uuid = require('node-uuid');

var Server = function(config) {
  this._config = config;
  this._players = {};

  this._rpc = DNode({
    connect: this.playerConnect.bind(this)
  });
  this._rpc.listen(this._config.rpc.port);
}

Server.prototype.playerConnect = function(player, callback) {
  console.info("Incoming player connection");

  var id = uuid.v4();

  this._players[id] = player;

  callback(null, id);
}

module.exports = Server;
