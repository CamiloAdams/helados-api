"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var billSchema = new _mongoose.Schema({
  id_usuario: {
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId
  },
  items: [{
    type: Map
  }],
  total: Number
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)("Bill", billSchema);
exports["default"] = _default;