var chai = require('chai')
  expect = chai.expect,
  should = chai.should(),
  sinon = require("sinon"),
  proxyquire = require("proxyquire");

var rpcServer = {
  listen: sinon.stub()
};

var stubs = {
  dnode: sinon.stub()
};

stubs.dnode.returns(rpcServer);

var Server = proxyquire("../lib/Server", stubs);

describe("Server", function() {
  describe("playerConnect", function() {
    it("should allocate a user an id", function(done) {
      var server = new Server({
        rpc: {
          port: 10
        }
      });

      var callback = sinon.stub();
      var player = {};

      server.playerConnect(player, callback);

      callback.callCount.should.equal(1);

      // should not have got an error
      expect(callback.getCall(0).args[0]).to.be.null;

      // should have got an id
      expect(callback.getCall(0).args[1]).not.to.be.null;

      // should have stored a reference to the player object
      server._players[callback.getCall(0).args[1]].should.equal(player);

      done();
    });
  })
})
