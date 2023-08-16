"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@coolwallet/core");

var _buffer = require("buffer");

var _utils = require("./utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Encoding;

(function (Encoding) {
  Encoding["BASE64"] = "base64";
  Encoding["HEX"] = "hex";
})(Encoding || (Encoding = {}));

var RNBleTransport = /*#__PURE__*/function (_Transport) {
  _inherits(RNBleTransport, _Transport);

  var _super = _createSuper(RNBleTransport);

  function RNBleTransport(device, commandCharacteristic, dataCharacteristic, statusCharacteristic, responseCharacteristic) {
    var _this;

    _classCallCheck(this, RNBleTransport);

    _this = _super.call(this, device);

    _defineProperty(_assertThisInitialized(_this), "sendCommandToCard", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(command) {
        var _this$commandCharacte, base64Command, bleError;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                base64Command = _buffer.Buffer.from(command).toString(Encoding.BASE64);
                _context.next = 4;
                return (_this$commandCharacte = _this.commandCharacteristic) === null || _this$commandCharacte === void 0 ? void 0 : _this$commandCharacte.writeWithResponse(base64Command);

              case 4:
                _context.next = 10;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                bleError = _context.t0;
                throw new _core.error.TransportError(_this.sendCommandToCard.name, "sendCommandToCard DisconnectedDeviceDuringOperation(".concat(bleError.message, ")"));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "sendDataToCard", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(packets) {
        var _this$dataCharacteris, base64Command, bleError;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                base64Command = _buffer.Buffer.from(packets).toString(Encoding.BASE64);
                _context2.next = 4;
                return (_this$dataCharacteris = _this.dataCharacteristic) === null || _this$dataCharacteris === void 0 ? void 0 : _this$dataCharacteris.writeWithResponse(base64Command);

              case 4:
                _context2.next = 10;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                bleError = _context2.t0;
                throw new _core.error.TransportError(_this.sendCommandToCard.name, "sendDataToCard DisconnectedDeviceDuringOperation(".concat(bleError.message, ")"));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "checkCardStatus", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _this$statusCharacter, _status$value, status, hexStatus, bleError;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (_this$statusCharacter = _this.statusCharacteristic) === null || _this$statusCharacter === void 0 ? void 0 : _this$statusCharacter.read();

            case 3:
              status = _context3.sent;
              hexStatus = _buffer.Buffer.from((_status$value = status === null || status === void 0 ? void 0 : status.value) !== null && _status$value !== void 0 ? _status$value : '', Encoding.BASE64).toString(Encoding.HEX);
              return _context3.abrupt("return", (0, _utils.hexToByteArray)(hexStatus)[0]);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              bleError = _context3.t0;
              throw new _core.error.TransportError(_this.checkCardStatus.name, "checkCardStatus DisconnectedDeviceDuringOperation(".concat(bleError.message, ")"));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "readDataFromCard", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this$responseCharact, _status$value2, status, hexStatus, bleError;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (_this$responseCharact = _this.responseCharacteristic) === null || _this$responseCharact === void 0 ? void 0 : _this$responseCharact.read();

            case 3:
              status = _context4.sent;
              hexStatus = _buffer.Buffer.from((_status$value2 = status === null || status === void 0 ? void 0 : status.value) !== null && _status$value2 !== void 0 ? _status$value2 : '', Encoding.BASE64).toString(Encoding.HEX);
              return _context4.abrupt("return", (0, _utils.hexToByteArray)(hexStatus));

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              bleError = _context4.t0;
              throw new _core.error.TransportError(_this.checkCardStatus.name, "checkCardStatus DisconnectedDeviceDuringOperation(".concat(bleError.message, ")"));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    })));

    _this.commandCharacteristic = commandCharacteristic;
    _this.dataCharacteristic = dataCharacteristic;
    _this.statusCharacteristic = statusCharacteristic;
    _this.responseCharacteristic = responseCharacteristic;
    return _this;
  }

  return _createClass(RNBleTransport);
}(_core.Transport);

var _default = RNBleTransport;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9STkJsZVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6WyJFbmNvZGluZyIsIlJOQmxlVHJhbnNwb3J0IiwiZGV2aWNlIiwiY29tbWFuZENoYXJhY3RlcmlzdGljIiwiZGF0YUNoYXJhY3RlcmlzdGljIiwic3RhdHVzQ2hhcmFjdGVyaXN0aWMiLCJyZXNwb25zZUNoYXJhY3RlcmlzdGljIiwiY29tbWFuZCIsImJhc2U2NENvbW1hbmQiLCJCdWZmZXIiLCJmcm9tIiwidG9TdHJpbmciLCJCQVNFNjQiLCJ3cml0ZVdpdGhSZXNwb25zZSIsImJsZUVycm9yIiwiZXJyb3IiLCJUcmFuc3BvcnRFcnJvciIsInNlbmRDb21tYW5kVG9DYXJkIiwibmFtZSIsIm1lc3NhZ2UiLCJwYWNrZXRzIiwicmVhZCIsInN0YXR1cyIsImhleFN0YXR1cyIsInZhbHVlIiwiSEVYIiwiY2hlY2tDYXJkU3RhdHVzIiwiVHJhbnNwb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVLQSxROztXQUFBQSxRO0FBQUFBLEVBQUFBLFE7QUFBQUEsRUFBQUEsUTtHQUFBQSxRLEtBQUFBLFE7O0lBS0NDLGM7Ozs7O0FBU0osMEJBQ0VDLE1BREYsRUFFRUMscUJBRkYsRUFHRUMsa0JBSEYsRUFJRUMsb0JBSkYsRUFLRUMsc0JBTEYsRUFNRTtBQUFBOztBQUFBOztBQUNBLDhCQUFNSixNQUFOOztBQURBO0FBQUEseUVBUWtCLGlCQUFPSyxPQUFQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxnQkFBQUEsYUFGVSxHQUVNQyxlQUFPQyxJQUFQLENBQVlILE9BQVosRUFBcUJJLFFBQXJCLENBQThCWCxRQUFRLENBQUNZLE1BQXZDLENBRk47QUFBQTtBQUFBLGdEQUdWLE1BQUtULHFCQUhLLDBEQUdWLHNCQUE0QlUsaUJBQTVCLENBQThDTCxhQUE5QyxDQUhVOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFLVk0sZ0JBQUFBLFFBTFU7QUFBQSxzQkFNVixJQUFJQyxZQUFNQyxjQUFWLENBQ0osTUFBS0MsaUJBQUwsQ0FBdUJDLElBRG5CLGdFQUVtREosUUFBUSxDQUFDSyxPQUY1RCxPQU5VOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BUmxCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsMEVBcUJlLGtCQUFPQyxPQUFQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVQWixnQkFBQUEsYUFGTyxHQUVTQyxlQUFPQyxJQUFQLENBQVlVLE9BQVosRUFBcUJULFFBQXJCLENBQThCWCxRQUFRLENBQUNZLE1BQXZDLENBRlQ7QUFBQTtBQUFBLGdEQUdQLE1BQUtSLGtCQUhFLDBEQUdQLHNCQUF5QlMsaUJBQXpCLENBQTJDTCxhQUEzQyxDQUhPOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFLUE0sZ0JBQUFBLFFBTE87QUFBQSxzQkFNUCxJQUFJQyxZQUFNQyxjQUFWLENBQ0osTUFBS0MsaUJBQUwsQ0FBdUJDLElBRG5CLDZEQUVnREosUUFBUSxDQUFDSyxPQUZ6RCxPQU5POztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BckJmOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLDJJQWtDZ0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FFTyxNQUFLZCxvQkFGWiwwREFFTyxzQkFBMkJnQixJQUEzQixFQUZQOztBQUFBO0FBRVJDLGNBQUFBLE1BRlE7QUFHUkMsY0FBQUEsU0FIUSxHQUdJZCxlQUFPQyxJQUFQLGtCQUFZWSxNQUFaLGFBQVlBLE1BQVosdUJBQVlBLE1BQU0sQ0FBRUUsS0FBcEIseURBQTZCLEVBQTdCLEVBQWlDeEIsUUFBUSxDQUFDWSxNQUExQyxFQUFrREQsUUFBbEQsQ0FBMkRYLFFBQVEsQ0FBQ3lCLEdBQXBFLENBSEo7QUFBQSxnREFJUCwyQkFBZUYsU0FBZixFQUEwQixDQUExQixDQUpPOztBQUFBO0FBQUE7QUFBQTtBQU1SVCxjQUFBQSxRQU5RO0FBQUEsb0JBT1IsSUFBSUMsWUFBTUMsY0FBVixDQUNKLE1BQUtVLGVBQUwsQ0FBcUJSLElBRGpCLDhEQUVpREosUUFBUSxDQUFDSyxPQUYxRCxPQVBROztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBbENoQjs7QUFBQSw0SUFnRGlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBRU0sTUFBS2Isc0JBRlgsMERBRU0sc0JBQTZCZSxJQUE3QixFQUZOOztBQUFBO0FBRVRDLGNBQUFBLE1BRlM7QUFHVEMsY0FBQUEsU0FIUyxHQUdHZCxlQUFPQyxJQUFQLG1CQUFZWSxNQUFaLGFBQVlBLE1BQVosdUJBQVlBLE1BQU0sQ0FBRUUsS0FBcEIsMkRBQTZCLEVBQTdCLEVBQWlDeEIsUUFBUSxDQUFDWSxNQUExQyxFQUFrREQsUUFBbEQsQ0FBMkRYLFFBQVEsQ0FBQ3lCLEdBQXBFLENBSEg7QUFBQSxnREFJUiwyQkFBZUYsU0FBZixDQUpROztBQUFBO0FBQUE7QUFBQTtBQU1UVCxjQUFBQSxRQU5TO0FBQUEsb0JBT1QsSUFBSUMsWUFBTUMsY0FBVixDQUNKLE1BQUtVLGVBQUwsQ0FBcUJSLElBRGpCLDhEQUVpREosUUFBUSxDQUFDSyxPQUYxRCxPQVBTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBaERqQjs7QUFFQSxVQUFLaEIscUJBQUwsR0FBNkJBLHFCQUE3QjtBQUNBLFVBQUtDLGtCQUFMLEdBQTBCQSxrQkFBMUI7QUFDQSxVQUFLQyxvQkFBTCxHQUE0QkEsb0JBQTVCO0FBQ0EsVUFBS0Msc0JBQUwsR0FBOEJBLHNCQUE5QjtBQUxBO0FBTUQ7OztFQXJCMEJxQixlOztlQThFZDFCLGMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENoYXJhY3RlcmlzdGljLCBEZXZpY2UgYXMgQmx1ZXRvb3RoRGV2aWNlLCBCbGVFcnJvciB9IGZyb20gJ3JlYWN0LW5hdGl2ZS1ibGUtcGx4JztcbmltcG9ydCB7IFRyYW5zcG9ydCwgZXJyb3IgfSBmcm9tICdAY29vbHdhbGxldC9jb3JlJztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG5cbmltcG9ydCB7IGhleFRvQnl0ZUFycmF5IH0gZnJvbSAnLi91dGlscyc7XG5cbmVudW0gRW5jb2Rpbmcge1xuICBCQVNFNjQgPSAnYmFzZTY0JyxcbiAgSEVYID0gJ2hleCcsXG59XG5cbmNsYXNzIFJOQmxlVHJhbnNwb3J0IGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgcHJpdmF0ZSBjb21tYW5kQ2hhcmFjdGVyaXN0aWM/OiBDaGFyYWN0ZXJpc3RpYztcblxuICBwcml2YXRlIGRhdGFDaGFyYWN0ZXJpc3RpYz86IENoYXJhY3RlcmlzdGljO1xuXG4gIHByaXZhdGUgc3RhdHVzQ2hhcmFjdGVyaXN0aWM/OiBDaGFyYWN0ZXJpc3RpYztcblxuICBwcml2YXRlIHJlc3BvbnNlQ2hhcmFjdGVyaXN0aWM/OiBDaGFyYWN0ZXJpc3RpYztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkZXZpY2U6IEJsdWV0b290aERldmljZSxcbiAgICBjb21tYW5kQ2hhcmFjdGVyaXN0aWM6IENoYXJhY3RlcmlzdGljLFxuICAgIGRhdGFDaGFyYWN0ZXJpc3RpYzogQ2hhcmFjdGVyaXN0aWMsXG4gICAgc3RhdHVzQ2hhcmFjdGVyaXN0aWM6IENoYXJhY3RlcmlzdGljLFxuICAgIHJlc3BvbnNlQ2hhcmFjdGVyaXN0aWM6IENoYXJhY3RlcmlzdGljXG4gICkge1xuICAgIHN1cGVyKGRldmljZSk7XG4gICAgdGhpcy5jb21tYW5kQ2hhcmFjdGVyaXN0aWMgPSBjb21tYW5kQ2hhcmFjdGVyaXN0aWM7XG4gICAgdGhpcy5kYXRhQ2hhcmFjdGVyaXN0aWMgPSBkYXRhQ2hhcmFjdGVyaXN0aWM7XG4gICAgdGhpcy5zdGF0dXNDaGFyYWN0ZXJpc3RpYyA9IHN0YXR1c0NoYXJhY3RlcmlzdGljO1xuICAgIHRoaXMucmVzcG9uc2VDaGFyYWN0ZXJpc3RpYyA9IHJlc3BvbnNlQ2hhcmFjdGVyaXN0aWM7XG4gIH1cblxuICBzZW5kQ29tbWFuZFRvQ2FyZCA9IGFzeW5jIChjb21tYW5kOiBudW1iZXJbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBiYXNlNjRDb21tYW5kID0gQnVmZmVyLmZyb20oY29tbWFuZCkudG9TdHJpbmcoRW5jb2RpbmcuQkFTRTY0KTtcbiAgICAgIGF3YWl0IHRoaXMuY29tbWFuZENoYXJhY3RlcmlzdGljPy53cml0ZVdpdGhSZXNwb25zZShiYXNlNjRDb21tYW5kKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zdCBibGVFcnJvciA9IGUgYXMgQmxlRXJyb3I7XG4gICAgICB0aHJvdyBuZXcgZXJyb3IuVHJhbnNwb3J0RXJyb3IoXG4gICAgICAgIHRoaXMuc2VuZENvbW1hbmRUb0NhcmQubmFtZSxcbiAgICAgICAgYHNlbmRDb21tYW5kVG9DYXJkIERpc2Nvbm5lY3RlZERldmljZUR1cmluZ09wZXJhdGlvbigke2JsZUVycm9yLm1lc3NhZ2V9KWBcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHNlbmREYXRhVG9DYXJkID0gYXN5bmMgKHBhY2tldHM6IG51bWJlcltdKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhc2U2NENvbW1hbmQgPSBCdWZmZXIuZnJvbShwYWNrZXRzKS50b1N0cmluZyhFbmNvZGluZy5CQVNFNjQpO1xuICAgICAgYXdhaXQgdGhpcy5kYXRhQ2hhcmFjdGVyaXN0aWM/LndyaXRlV2l0aFJlc3BvbnNlKGJhc2U2NENvbW1hbmQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IGJsZUVycm9yID0gZSBhcyBCbGVFcnJvcjtcbiAgICAgIHRocm93IG5ldyBlcnJvci5UcmFuc3BvcnRFcnJvcihcbiAgICAgICAgdGhpcy5zZW5kQ29tbWFuZFRvQ2FyZC5uYW1lLFxuICAgICAgICBgc2VuZERhdGFUb0NhcmQgRGlzY29ubmVjdGVkRGV2aWNlRHVyaW5nT3BlcmF0aW9uKCR7YmxlRXJyb3IubWVzc2FnZX0pYFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgY2hlY2tDYXJkU3RhdHVzID0gYXN5bmMgKCk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IHRoaXMuc3RhdHVzQ2hhcmFjdGVyaXN0aWM/LnJlYWQoKTtcbiAgICAgIGNvbnN0IGhleFN0YXR1cyA9IEJ1ZmZlci5mcm9tKHN0YXR1cz8udmFsdWUgPz8gJycsIEVuY29kaW5nLkJBU0U2NCkudG9TdHJpbmcoRW5jb2RpbmcuSEVYKTtcbiAgICAgIHJldHVybiBoZXhUb0J5dGVBcnJheShoZXhTdGF0dXMpWzBdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IGJsZUVycm9yID0gZSBhcyBCbGVFcnJvcjtcbiAgICAgIHRocm93IG5ldyBlcnJvci5UcmFuc3BvcnRFcnJvcihcbiAgICAgICAgdGhpcy5jaGVja0NhcmRTdGF0dXMubmFtZSxcbiAgICAgICAgYGNoZWNrQ2FyZFN0YXR1cyBEaXNjb25uZWN0ZWREZXZpY2VEdXJpbmdPcGVyYXRpb24oJHtibGVFcnJvci5tZXNzYWdlfSlgXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZWFkRGF0YUZyb21DYXJkID0gYXN5bmMgKCk6IFByb21pc2U8bnVtYmVyW10+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgdGhpcy5yZXNwb25zZUNoYXJhY3RlcmlzdGljPy5yZWFkKCk7XG4gICAgICBjb25zdCBoZXhTdGF0dXMgPSBCdWZmZXIuZnJvbShzdGF0dXM/LnZhbHVlID8/ICcnLCBFbmNvZGluZy5CQVNFNjQpLnRvU3RyaW5nKEVuY29kaW5nLkhFWCk7XG4gICAgICByZXR1cm4gaGV4VG9CeXRlQXJyYXkoaGV4U3RhdHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zdCBibGVFcnJvciA9IGUgYXMgQmxlRXJyb3I7XG4gICAgICB0aHJvdyBuZXcgZXJyb3IuVHJhbnNwb3J0RXJyb3IoXG4gICAgICAgIHRoaXMuY2hlY2tDYXJkU3RhdHVzLm5hbWUsXG4gICAgICAgIGBjaGVja0NhcmRTdGF0dXMgRGlzY29ubmVjdGVkRGV2aWNlRHVyaW5nT3BlcmF0aW9uKCR7YmxlRXJyb3IubWVzc2FnZX0pYFxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJOQmxlVHJhbnNwb3J0O1xuIl19