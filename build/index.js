"use strict";

var _app = _interopRequireDefault(require("./app"));
var _fs = _interopRequireDefault(require("fs"));
var _http = _interopRequireDefault(require("http"));
var _https = _interopRequireDefault(require("https"));
require("./database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var certificate = _fs["default"].readFileSync("./cnshelados.tech/certificate.crt", "utf8", function (err) {
  if (err) console.log(err);
});
var privateKey = _fs["default"].readFileSync("./cnshelados.tech/private.key", "utf8", function (err) {
  if (err) console.log(err);
});
var credentials = {
  key: privateKey,
  cert: certificate
};
var httpServer = _http["default"].createServer(_app["default"]);
var httpsServer = _https["default"].createServer(credentials, _app["default"]);
httpServer.listen(3000);
httpsServer.listen(3001);
console.log("Http server listen port 3000");
console.log("Https server listen port 3001");

//app.listen(3000);

//console.log("Server listen on port:", 3000);