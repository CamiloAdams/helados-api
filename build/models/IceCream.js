"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var icreCreamSchema = new _mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imgURL: String,
  stock: Number
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)("IceCream", icreCreamSchema);
exports["default"] = _default;