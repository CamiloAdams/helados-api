"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserStats = exports.getAdminStats = void 0;
var _User = _interopRequireDefault(require("../models/User"));
var _IceCream = _interopRequireDefault(require("../models/IceCream"));
var _Bill = _interopRequireDefault(require("../models/Bill"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getUserStats = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var token, decoded, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers["x-access-token"];
            if (token) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", res.status(403).json({
              message: "No token provided"
            }));
          case 4:
            _context.next = 6;
            return _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          case 6:
            decoded = _context.sent;
            _context.next = 9;
            return _User["default"].findById(decoded.id, {
              password: 0,
              roles: 0
            });
          case 9:
            user = _context.sent;
            _context.t0 = res.status(201);
            _context.t1 = user.balance;
            _context.t2 = user.spent_balance;
            _context.next = 15;
            return getBoughtIceCreams(user._id);
          case 15:
            _context.t3 = _context.sent;
            _context.t4 = {
              balance: _context.t1,
              spent_balance: _context.t2,
              bought_ice_creams: _context.t3
            };
            _context.t0.json.call(_context.t0, _context.t4);
            if (user) {
              _context.next = 20;
              break;
            }
            return _context.abrupt("return", res.status(404).json({
              message: "No user found"
            }));
          case 20:
            _context.next = 26;
            break;
          case 22:
            _context.prev = 22;
            _context.t5 = _context["catch"](0);
            console.log(_context.t5);
            return _context.abrupt("return", res.status(401).json({
              message: "Unauthorized"
            }));
          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 22]]);
  }));
  return function getUserStats(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUserStats = getUserStats;
var getAdminStats = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var token, decoded, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            token = req.headers["x-access-token"];
            if (token) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", res.status(403).json({
              message: "No token provided"
            }));
          case 4:
            _context2.next = 6;
            return _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          case 6:
            decoded = _context2.sent;
            _context2.next = 9;
            return _User["default"].findById(decoded.id, {
              password: 0,
              roles: 0
            });
          case 9:
            user = _context2.sent;
            if (user) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              message: "No user found"
            }));
          case 12:
            _context2.t0 = res.status(201);
            _context2.next = 15;
            return getAvgSpentMoney();
          case 15:
            _context2.t1 = _context2.sent;
            _context2.next = 18;
            return getTotalBoughtIceCreams();
          case 18:
            _context2.t2 = _context2.sent;
            _context2.next = 21;
            return getIceCreamProfit();
          case 21:
            _context2.t3 = _context2.sent;
            _context2.next = 24;
            return getTotalIceCreamProfit();
          case 24:
            _context2.t4 = _context2.sent;
            _context2.t5 = {
              avg_spent_money: _context2.t1,
              total_bought_ice_creams: _context2.t2,
              ice_cream_profit: _context2.t3,
              total_profit: _context2.t4
            };
            _context2.t0.json.call(_context2.t0, _context2.t5);
            _context2.next = 33;
            break;
          case 29:
            _context2.prev = 29;
            _context2.t6 = _context2["catch"](0);
            console.log(_context2.t6);
            return _context2.abrupt("return", res.status(401).json({
              message: "Unauthorized"
            }));
          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 29]]);
  }));
  return function getAdminStats(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAdminStats = getAdminStats;
function getBoughtIceCreams(_x5) {
  return _getBoughtIceCreams.apply(this, arguments);
}
function _getBoughtIceCreams() {
  _getBoughtIceCreams = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(userId) {
    var bills, iceCreamsObject, index, items, j, element, iceCream;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Bill["default"].find({
              id_usuario: userId
            });
          case 2:
            bills = _context3.sent;
            _context3.next = 5;
            return getIceCreamsObject();
          case 5:
            iceCreamsObject = _context3.sent;
            index = 0;
          case 7:
            if (!(index < bills.length)) {
              _context3.next = 22;
              break;
            }
            items = bills[index].items;
            j = 0;
          case 10:
            if (!(j < items.length)) {
              _context3.next = 19;
              break;
            }
            element = items[j];
            _context3.next = 14;
            return _IceCream["default"].findOne({
              _id: element.get("item")
            });
          case 14:
            iceCream = _context3.sent;
            iceCreamsObject[iceCream.name] += parseFloat(element.get("quantity"));
          case 16:
            j++;
            _context3.next = 10;
            break;
          case 19:
            index++;
            _context3.next = 7;
            break;
          case 22:
            return _context3.abrupt("return", iceCreamsObject);
          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getBoughtIceCreams.apply(this, arguments);
}
function getIceCreamsObject() {
  return _getIceCreamsObject.apply(this, arguments);
}
function _getIceCreamsObject() {
  _getIceCreamsObject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var iceCreams, iceCreamsObject, index, element;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _IceCream["default"].find();
          case 2:
            iceCreams = _context4.sent;
            iceCreamsObject = {};
            for (index = 0; index < iceCreams.length; index++) {
              element = iceCreams[index];
              iceCreamsObject[element.name] = 0;
            }
            return _context4.abrupt("return", iceCreamsObject);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getIceCreamsObject.apply(this, arguments);
}
function getAvgSpentMoney() {
  return _getAvgSpentMoney.apply(this, arguments);
}
function _getAvgSpentMoney() {
  _getAvgSpentMoney = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var users, avgsum, index, element;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _User["default"].find();
          case 2:
            users = _context5.sent;
            avgsum = 0;
            index = 0;
          case 5:
            if (!(index < users.length)) {
              _context5.next = 13;
              break;
            }
            element = users[index];
            if (!(element.username == "admin")) {
              _context5.next = 9;
              break;
            }
            return _context5.abrupt("continue", 10);
          case 9:
            avgsum += element.spent_balance;
          case 10:
            index++;
            _context5.next = 5;
            break;
          case 13:
            return _context5.abrupt("return", avgsum / users.length);
          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getAvgSpentMoney.apply(this, arguments);
}
function getTotalBoughtIceCreams() {
  return _getTotalBoughtIceCreams.apply(this, arguments);
}
function _getTotalBoughtIceCreams() {
  _getTotalBoughtIceCreams = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var bills, iceCreamsObject, index, items, j, element, iceCream;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Bill["default"].find();
          case 2:
            bills = _context6.sent;
            _context6.next = 5;
            return getIceCreamsObject();
          case 5:
            iceCreamsObject = _context6.sent;
            index = 0;
          case 7:
            if (!(index < bills.length)) {
              _context6.next = 22;
              break;
            }
            items = bills[index].items;
            j = 0;
          case 10:
            if (!(j < items.length)) {
              _context6.next = 19;
              break;
            }
            element = items[j];
            _context6.next = 14;
            return _IceCream["default"].findOne({
              _id: element.get("item")
            });
          case 14:
            iceCream = _context6.sent;
            iceCreamsObject[iceCream.name] += parseFloat(element.get("quantity"));
          case 16:
            j++;
            _context6.next = 10;
            break;
          case 19:
            index++;
            _context6.next = 7;
            break;
          case 22:
            return _context6.abrupt("return", iceCreamsObject);
          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getTotalBoughtIceCreams.apply(this, arguments);
}
function getIceCreamProfit() {
  return _getIceCreamProfit.apply(this, arguments);
}
function _getIceCreamProfit() {
  _getIceCreamProfit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var bills, iceCreamsObject, index, items, j, element, iceCream;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Bill["default"].find();
          case 2:
            bills = _context7.sent;
            _context7.next = 5;
            return getIceCreamsObject();
          case 5:
            iceCreamsObject = _context7.sent;
            index = 0;
          case 7:
            if (!(index < bills.length)) {
              _context7.next = 22;
              break;
            }
            items = bills[index].items;
            j = 0;
          case 10:
            if (!(j < items.length)) {
              _context7.next = 19;
              break;
            }
            element = items[j];
            _context7.next = 14;
            return _IceCream["default"].findOne({
              _id: element.get("item")
            });
          case 14:
            iceCream = _context7.sent;
            iceCreamsObject[iceCream.name] += parseFloat(element.get("quantity")) * iceCream.price;
          case 16:
            j++;
            _context7.next = 10;
            break;
          case 19:
            index++;
            _context7.next = 7;
            break;
          case 22:
            return _context7.abrupt("return", iceCreamsObject);
          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getIceCreamProfit.apply(this, arguments);
}
function getTotalIceCreamProfit(_x6) {
  return _getTotalIceCreamProfit.apply(this, arguments);
}
function _getTotalIceCreamProfit() {
  _getTotalIceCreamProfit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(userId) {
    var bills, profit, index, items, j, element, iceCream;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Bill["default"].find();
          case 2:
            bills = _context8.sent;
            profit = 0;
            index = 0;
          case 5:
            if (!(index < bills.length)) {
              _context8.next = 20;
              break;
            }
            items = bills[index].items;
            j = 0;
          case 8:
            if (!(j < items.length)) {
              _context8.next = 17;
              break;
            }
            element = items[j];
            _context8.next = 12;
            return _IceCream["default"].findOne({
              _id: element.get("item")
            });
          case 12:
            iceCream = _context8.sent;
            profit += parseFloat(element.get("quantity")) * iceCream.price;
          case 14:
            j++;
            _context8.next = 8;
            break;
          case 17:
            index++;
            _context8.next = 5;
            break;
          case 20:
            return _context8.abrupt("return", profit);
          case 21:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getTotalIceCreamProfit.apply(this, arguments);
}