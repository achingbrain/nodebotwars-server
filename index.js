var Server = require("./lib/Server"),
  path = require("path");

var config = require("rc")("nodebotwars", path.resolve(__dirname, ".nodebotwarsrc"));

var server = new Server(config);
