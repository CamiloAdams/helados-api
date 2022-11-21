"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _cors = _interopRequireDefault(require("cors"));
var _initialSetup = require("./libs/initialSetup");
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _icecream = _interopRequireDefault(require("./routes/icecream.routes"));
var _bill = _interopRequireDefault(require("./routes/bill.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _stats = _interopRequireDefault(require("./routes/stats.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
(0, _initialSetup.createAdminUser)();
app.set("pkg", _package["default"]);
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.get("/", function (req, res) {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version
  });
});
app.use("/api/auth", _auth["default"]);
app.use("/api/icecreams", _icecream["default"]);
app.use("/api/bills", _bill["default"]);
app.use("/api/user", _user["default"]);
app.use("/api/stats", _stats["default"]);
var _default = app;
exports["default"] = _default;