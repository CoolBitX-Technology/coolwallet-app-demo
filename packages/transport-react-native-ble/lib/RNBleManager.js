"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNativeBlePlx = require("react-native-ble-plx");

var _core = require("@coolwallet/core");

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _last = _interopRequireDefault(require("lodash/last"));

var _RNBleTransport = _interopRequireDefault(require("./RNBleTransport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RNBleManager = /*#__PURE__*/function () {
  function RNBleManager() {
    var _this = this;

    _classCallCheck(this, RNBleManager);

    _defineProperty(this, "scanAndConnect", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.disconnect();

              case 2:
                _this.bleManager.startDeviceScan(_this.uuids, null, function (bleError, device) {
                  if (!(0, _isNil["default"])(bleError)) {
                    callback === null || callback === void 0 ? void 0 : callback(bleError, undefined);
                    return;
                  }

                  if (!(0, _isNil["default"])(device)) {
                    callback === null || callback === void 0 ? void 0 : callback(undefined, device);
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "connect", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(device) {
        var connectedDevice, isConnected, serviceDevices, services, characteristics, characteristic, commandCharacteristic, dataCharacteristic, statusCharacteristic, responseCharacteristic;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _this.bleManager.connectToDevice(device.id);

              case 3:
                connectedDevice = _context3.sent;
                _context3.next = 15;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);

                if (!(_context3.t0.errorCode === _reactNativeBlePlx.BleErrorCode.DeviceMTUChangeFailed)) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 11;
                return _this.bleManager.connectToDevice(device.id);

              case 11:
                connectedDevice = _context3.sent;
                _context3.next = 15;
                break;

              case 14:
                throw _context3.t0;

              case 15:
                if (!(0, _isNil["default"])(connectedDevice)) {
                  _context3.next = 17;
                  break;
                }

                throw new _core.error.TransportError(_this.connect.name, 'can not open device');

              case 17:
                _context3.next = 19;
                return connectedDevice.isConnected();

              case 19:
                isConnected = _context3.sent;

                if (!isConnected) {
                  _context3.next = 23;
                  break;
                }

                _context3.next = 23;
                return connectedDevice.connect();

              case 23:
                _context3.next = 25;
                return connectedDevice.discoverAllServicesAndCharacteristics();

              case 25:
                serviceDevices = _context3.sent;
                _context3.next = 28;
                return serviceDevices.services();

              case 28:
                services = _context3.sent;
                _context3.next = 31;
                return Promise.all(services.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(service) {
                    var _connectedDevice;

                    var uuid, serviceUuid, servicesCharacteristic, commandCharacteristic, dataCharacteristic, statusCharacteristic, responseCharacteristic, result;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            uuid = service.uuid;
                            serviceUuid = _core.device.getInfosForServiceUuid(uuid);

                            if (!(0, _isNil["default"])(serviceUuid)) {
                              _context2.next = 4;
                              break;
                            }

                            return _context2.abrupt("return", null);

                          case 4:
                            _context2.next = 6;
                            return (_connectedDevice = connectedDevice) === null || _connectedDevice === void 0 ? void 0 : _connectedDevice.characteristicsForService(uuid);

                          case 6:
                            servicesCharacteristic = _context2.sent;

                            if (!(0, _isNil["default"])(servicesCharacteristic)) {
                              _context2.next = 9;
                              break;
                            }

                            throw new _core.error.TransportError(_this.connect.name, 'service not found');

                          case 9:
                            commandCharacteristic = servicesCharacteristic.find(function (c) {
                              return c.uuid === serviceUuid.writeUuid;
                            });
                            dataCharacteristic = servicesCharacteristic.find(function (c) {
                              return c.uuid === serviceUuid.dataUuid;
                            });
                            statusCharacteristic = servicesCharacteristic.find(function (c) {
                              return c.uuid === serviceUuid.checkUuid;
                            });
                            responseCharacteristic = servicesCharacteristic.find(function (c) {
                              return c.uuid === serviceUuid.readUuid;
                            });
                            result = {
                              commandCharacteristic: commandCharacteristic,
                              dataCharacteristic: dataCharacteristic,
                              statusCharacteristic: statusCharacteristic,
                              responseCharacteristic: responseCharacteristic
                            }; // Check whether any characteristic is null

                            if (!Object.values(result).some(_isNil["default"])) {
                              _context2.next = 16;
                              break;
                            }

                            return _context2.abrupt("return", null);

                          case 16:
                            return _context2.abrupt("return", result);

                          case 17:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }())).then(function (res) {
                  return res.filter(function (r) {
                    return !(0, _isNil["default"])(r);
                  });
                });

              case 31:
                characteristics = _context3.sent;
                characteristic = (0, _last["default"])(characteristics);

                if (!(0, _isNil["default"])(characteristics)) {
                  _context3.next = 35;
                  break;
                }

                throw new _core.error.TransportError(_this.connect.name, 'characteristic not found');

              case 35:
                commandCharacteristic = characteristic === null || characteristic === void 0 ? void 0 : characteristic.commandCharacteristic;
                dataCharacteristic = characteristic === null || characteristic === void 0 ? void 0 : characteristic.dataCharacteristic;
                statusCharacteristic = characteristic === null || characteristic === void 0 ? void 0 : characteristic.statusCharacteristic;
                responseCharacteristic = characteristic === null || characteristic === void 0 ? void 0 : characteristic.responseCharacteristic;

                if (!(0, _isNil["default"])(commandCharacteristic)) {
                  _context3.next = 41;
                  break;
                }

                throw new _core.error.TransportError(_this.connect.name, 'commandCharacteristic not found');

              case 41:
                if (!(0, _isNil["default"])(dataCharacteristic)) {
                  _context3.next = 43;
                  break;
                }

                throw new _core.error.TransportError(_this.connect.name, 'dataCharacteristic not found');

              case 43:
                if (!(0, _isNil["default"])(statusCharacteristic)) {
                  _context3.next = 45;
                  break;
                }

                throw new _core.error.TransportError(_this.connect.name, 'statusCharacteristic not found');

              case 45:
                if (!(0, _isNil["default"])(responseCharacteristic)) {
                  _context3.next = 47;
                  break;
                }

                throw new _core.error.TransportError(_this.connect.name, 'responseCharacteristic not found');

              case 47:
                _this.transport = new _RNBleTransport["default"](device, commandCharacteristic, dataCharacteristic, statusCharacteristic, responseCharacteristic);
                return _context3.abrupt("return", _this.transport);

              case 49:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 6]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "disconnectedById", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.bleManager.cancelDeviceConnection(id);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(this, "disconnect", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var connectedDevices;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.bleManager.connectedDevices(_this.uuids);

            case 2:
              connectedDevices = _context5.sent;
              _context5.next = 5;
              return Promise.all(connectedDevices.map(function (_ref6) {
                var id = _ref6.id;
                return _this.disconnectedById(id);
              }));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));

    this.bleManager = new _reactNativeBlePlx.BleManager();
    this.uuids = _core.device.getBluetoothServiceUuids();
  }
  /**
   * Check whether platforms support bluetooth.
   *
   * @returns {Promise<boolean>}
   */


  _createClass(RNBleManager, [{
    key: "isSupported",
    value: function () {
      var _isSupported = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var supported;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.bleManager.state();

              case 2:
                _context6.t0 = _context6.sent;
                _context6.t1 = _reactNativeBlePlx.State.PoweredOn;
                supported = _context6.t0 === _context6.t1;
                return _context6.abrupt("return", supported);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function isSupported() {
        return _isSupported.apply(this, arguments);
      }

      return isSupported;
    }()
  }, {
    key: "listen",
    value: function listen(callback) {
      var _this2 = this;

      this.stateSubscription = this.bleManager.onStateChange(function (state) {
        if (state === _reactNativeBlePlx.State.PoweredOn) {
          var _this2$stateSubscript;

          _this2.scanAndConnect(callback);

          (_this2$stateSubscript = _this2.stateSubscription) === null || _this2$stateSubscript === void 0 ? void 0 : _this2$stateSubscript.remove();
        }
      }, true);
    }
  }, {
    key: "stopListen",
    value: function stopListen() {
      var _this$stateSubscripti;

      (_this$stateSubscripti = this.stateSubscription) === null || _this$stateSubscripti === void 0 ? void 0 : _this$stateSubscripti.remove();
      this.bleManager.stopDeviceScan();
    }
  }]);

  return RNBleManager;
}();

var _default = RNBleManager;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9STkJsZU1hbmFnZXIudHMiXSwibmFtZXMiOlsiUk5CbGVNYW5hZ2VyIiwiY2FsbGJhY2siLCJkaXNjb25uZWN0IiwiYmxlTWFuYWdlciIsInN0YXJ0RGV2aWNlU2NhbiIsInV1aWRzIiwiYmxlRXJyb3IiLCJkZXZpY2UiLCJ1bmRlZmluZWQiLCJjb25uZWN0VG9EZXZpY2UiLCJpZCIsImNvbm5lY3RlZERldmljZSIsImVycm9yQ29kZSIsIkJsZUVycm9yQ29kZSIsIkRldmljZU1UVUNoYW5nZUZhaWxlZCIsImVycm9yIiwiVHJhbnNwb3J0RXJyb3IiLCJjb25uZWN0IiwibmFtZSIsImlzQ29ubmVjdGVkIiwiZGlzY292ZXJBbGxTZXJ2aWNlc0FuZENoYXJhY3RlcmlzdGljcyIsInNlcnZpY2VEZXZpY2VzIiwic2VydmljZXMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwic2VydmljZSIsInV1aWQiLCJzZXJ2aWNlVXVpZCIsImNvcmVEZXZpY2UiLCJnZXRJbmZvc0ZvclNlcnZpY2VVdWlkIiwiY2hhcmFjdGVyaXN0aWNzRm9yU2VydmljZSIsInNlcnZpY2VzQ2hhcmFjdGVyaXN0aWMiLCJjb21tYW5kQ2hhcmFjdGVyaXN0aWMiLCJmaW5kIiwiYyIsIndyaXRlVXVpZCIsImRhdGFDaGFyYWN0ZXJpc3RpYyIsImRhdGFVdWlkIiwic3RhdHVzQ2hhcmFjdGVyaXN0aWMiLCJjaGVja1V1aWQiLCJyZXNwb25zZUNoYXJhY3RlcmlzdGljIiwicmVhZFV1aWQiLCJyZXN1bHQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzb21lIiwiaXNOaWwiLCJ0aGVuIiwicmVzIiwiZmlsdGVyIiwiciIsImNoYXJhY3RlcmlzdGljcyIsImNoYXJhY3RlcmlzdGljIiwidHJhbnNwb3J0IiwiUk5CbGVUcmFuc3BvcnQiLCJjYW5jZWxEZXZpY2VDb25uZWN0aW9uIiwiY29ubmVjdGVkRGV2aWNlcyIsImRpc2Nvbm5lY3RlZEJ5SWQiLCJCbGVNYW5hZ2VyIiwiZ2V0Qmx1ZXRvb3RoU2VydmljZVV1aWRzIiwic3RhdGUiLCJTdGF0ZSIsIlBvd2VyZWRPbiIsInN1cHBvcnRlZCIsInN0YXRlU3Vic2NyaXB0aW9uIiwib25TdGF0ZUNoYW5nZSIsInNjYW5BbmRDb25uZWN0IiwicmVtb3ZlIiwic3RvcERldmljZVNjYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQUlNQSxZO0FBU0osMEJBQWM7QUFBQTs7QUFBQTs7QUFBQTtBQUFBLHlFQXdCRyxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDVCxLQUFJLENBQUNDLFVBQUwsRUFEUzs7QUFBQTtBQUVmLGdCQUFBLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkMsZUFBaEIsQ0FBZ0MsS0FBSSxDQUFDQyxLQUFyQyxFQUE0QyxJQUE1QyxFQUFrRCxVQUFDQyxRQUFELEVBQVdDLE1BQVgsRUFBc0I7QUFDdEUsc0JBQUksQ0FBQyx1QkFBTUQsUUFBTixDQUFMLEVBQXNCO0FBQ3BCTCxvQkFBQUEsUUFBUSxTQUFSLElBQUFBLFFBQVEsV0FBUixZQUFBQSxRQUFRLENBQUdLLFFBQUgsRUFBYUUsU0FBYixDQUFSO0FBQ0E7QUFDRDs7QUFDRCxzQkFBSSxDQUFDLHVCQUFNRCxNQUFOLENBQUwsRUFBb0I7QUFDbEJOLG9CQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsQ0FBR08sU0FBSCxFQUFjRCxNQUFkLENBQVI7QUFDRDtBQUNGLGlCQVJEOztBQUZlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BeEJIOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsMEVBMENKLGtCQUFPQSxNQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFJa0IsS0FBSSxDQUFDSixVQUFMLENBQWdCTSxlQUFoQixDQUFnQ0YsTUFBTSxDQUFDRyxFQUF2QyxDQUpsQjs7QUFBQTtBQUlO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b0JsRSxRQUFwQjs7QUFDQSxtQ0FBQSxNQUFJLENBQUNnRSxpQkFBTCxnRkFBd0JHLE1BQXhCO0FBQ0Q7QUFDRixPQUx3QixFQUt0QixJQUxzQixDQUF6QjtBQU1EOzs7V0FlRCxzQkFBb0I7QUFBQTs7QUFDbEIsb0NBQUtILGlCQUFMLGdGQUF3QkcsTUFBeEI7QUFDQSxXQUFLakUsVUFBTCxDQUFnQmtFLGNBQWhCO0FBQ0Q7Ozs7OztlQW1HWXJFLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCbGVNYW5hZ2VyLCBCbGVFcnJvckNvZGUsIERldmljZSBhcyBCbHVldG9vdGhEZXZpY2UsIFN0YXRlIH0gZnJvbSAncmVhY3QtbmF0aXZlLWJsZS1wbHgnO1xuaW1wb3J0IHsgVHJhbnNwb3J0LCBCbGVNYW5hZ2VyIGFzIENvcmVCbGVNYW5hZ2VyLCBkZXZpY2UgYXMgY29yZURldmljZSwgZXJyb3IgfSBmcm9tICdAY29vbHdhbGxldC9jb3JlJztcbmltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2gvaXNOaWwnO1xuaW1wb3J0IGxhc3QgZnJvbSAnbG9kYXNoL2xhc3QnO1xuaW1wb3J0IHR5cGUgeyBCbGVFcnJvciwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncmVhY3QtbmF0aXZlLWJsZS1wbHgnO1xuaW1wb3J0IFJOQmxlVHJhbnNwb3J0IGZyb20gJy4vUk5CbGVUcmFuc3BvcnQnO1xuXG50eXBlIE9wdGlvbmFsPFQ+ID0gVCB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbmNsYXNzIFJOQmxlTWFuYWdlciBpbXBsZW1lbnRzIENvcmVCbGVNYW5hZ2VyIHtcbiAgdHJhbnNwb3J0PzogVHJhbnNwb3J0O1xuXG4gIGJsZU1hbmFnZXI6IEJsZU1hbmFnZXI7XG5cbiAgdXVpZHM6IHN0cmluZ1tdO1xuXG4gIHN0YXRlU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYmxlTWFuYWdlciA9IG5ldyBCbGVNYW5hZ2VyKCk7XG4gICAgdGhpcy51dWlkcyA9IGNvcmVEZXZpY2UuZ2V0Qmx1ZXRvb3RoU2VydmljZVV1aWRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBwbGF0Zm9ybXMgc3VwcG9ydCBibHVldG9vdGguXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxuICAgKi9cbiAgYXN5bmMgaXNTdXBwb3J0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgc3VwcG9ydGVkID0gKGF3YWl0IHRoaXMuYmxlTWFuYWdlci5zdGF0ZSgpKSA9PT0gU3RhdGUuUG93ZXJlZE9uO1xuICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gIH1cblxuICBsaXN0ZW4oY2FsbGJhY2s/OiAoZXJyb3I/OiBCbGVFcnJvciwgZGV2aWNlPzogQmx1ZXRvb3RoRGV2aWNlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuYmxlTWFuYWdlci5vblN0YXRlQ2hhbmdlKChzdGF0ZSkgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSBTdGF0ZS5Qb3dlcmVkT24pIHtcbiAgICAgICAgdGhpcy5zY2FuQW5kQ29ubmVjdChjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24/LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0sIHRydWUpO1xuICB9XG5cbiAgc2NhbkFuZENvbm5lY3QgPSBhc3luYyAoY2FsbGJhY2s/OiAoZXJyb3I/OiBCbGVFcnJvciwgZGV2aWNlPzogQmx1ZXRvb3RoRGV2aWNlKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5ibGVNYW5hZ2VyLnN0YXJ0RGV2aWNlU2Nhbih0aGlzLnV1aWRzLCBudWxsLCAoYmxlRXJyb3IsIGRldmljZSkgPT4ge1xuICAgICAgaWYgKCFpc05pbChibGVFcnJvcikpIHtcbiAgICAgICAgY2FsbGJhY2s/LihibGVFcnJvciwgdW5kZWZpbmVkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFpc05pbChkZXZpY2UpKSB7XG4gICAgICAgIGNhbGxiYWNrPy4odW5kZWZpbmVkLCBkZXZpY2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHN0b3BMaXN0ZW4/KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24/LnJlbW92ZSgpO1xuICAgIHRoaXMuYmxlTWFuYWdlci5zdG9wRGV2aWNlU2NhbigpO1xuICB9XG5cbiAgY29ubmVjdCA9IGFzeW5jIChkZXZpY2U6IEJsdWV0b290aERldmljZSk6IFByb21pc2U8VHJhbnNwb3J0PiA9PiB7XG4gICAgbGV0IGNvbm5lY3RlZERldmljZTogT3B0aW9uYWw8Qmx1ZXRvb3RoRGV2aWNlPjtcblxuICAgIHRyeSB7XG4gICAgICBjb25uZWN0ZWREZXZpY2UgPSBhd2FpdCB0aGlzLmJsZU1hbmFnZXIuY29ubmVjdFRvRGV2aWNlKGRldmljZS5pZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKChlIGFzIEJsZUVycm9yKS5lcnJvckNvZGUgPT09IEJsZUVycm9yQ29kZS5EZXZpY2VNVFVDaGFuZ2VGYWlsZWQpIHtcbiAgICAgICAgY29ubmVjdGVkRGV2aWNlID0gYXdhaXQgdGhpcy5ibGVNYW5hZ2VyLmNvbm5lY3RUb0RldmljZShkZXZpY2UuaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNOaWwoY29ubmVjdGVkRGV2aWNlKSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9yLlRyYW5zcG9ydEVycm9yKHRoaXMuY29ubmVjdC5uYW1lLCAnY2FuIG5vdCBvcGVuIGRldmljZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gYXdhaXQgY29ubmVjdGVkRGV2aWNlLmlzQ29ubmVjdGVkKCk7XG4gICAgaWYgKGlzQ29ubmVjdGVkKSB7XG4gICAgICBhd2FpdCBjb25uZWN0ZWREZXZpY2UuY29ubmVjdCgpO1xuICAgIH1cbiAgICBjb25zdCBzZXJ2aWNlRGV2aWNlcyA9IGF3YWl0IGNvbm5lY3RlZERldmljZS5kaXNjb3ZlckFsbFNlcnZpY2VzQW5kQ2hhcmFjdGVyaXN0aWNzKCk7XG4gICAgY29uc3Qgc2VydmljZXMgPSBhd2FpdCBzZXJ2aWNlRGV2aWNlcy5zZXJ2aWNlcygpO1xuICAgIGNvbnN0IGNoYXJhY3RlcmlzdGljcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgc2VydmljZXMubWFwKGFzeW5jIChzZXJ2aWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdXVpZCB9ID0gc2VydmljZTtcbiAgICAgICAgY29uc3Qgc2VydmljZVV1aWQgPSBjb3JlRGV2aWNlLmdldEluZm9zRm9yU2VydmljZVV1aWQodXVpZCk7XG4gICAgICAgIGlmIChpc05pbChzZXJ2aWNlVXVpZCkpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBzZXJ2aWNlc0NoYXJhY3RlcmlzdGljID0gYXdhaXQgY29ubmVjdGVkRGV2aWNlPy5jaGFyYWN0ZXJpc3RpY3NGb3JTZXJ2aWNlKHV1aWQpO1xuICAgICAgICBpZiAoaXNOaWwoc2VydmljZXNDaGFyYWN0ZXJpc3RpYykpIHRocm93IG5ldyBlcnJvci5UcmFuc3BvcnRFcnJvcih0aGlzLmNvbm5lY3QubmFtZSwgJ3NlcnZpY2Ugbm90IGZvdW5kJyk7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRDaGFyYWN0ZXJpc3RpYyA9IHNlcnZpY2VzQ2hhcmFjdGVyaXN0aWMuZmluZCgoYykgPT4gYy51dWlkID09PSBzZXJ2aWNlVXVpZC53cml0ZVV1aWQpO1xuICAgICAgICBjb25zdCBkYXRhQ2hhcmFjdGVyaXN0aWMgPSBzZXJ2aWNlc0NoYXJhY3RlcmlzdGljLmZpbmQoKGMpID0+IGMudXVpZCA9PT0gc2VydmljZVV1aWQuZGF0YVV1aWQpO1xuICAgICAgICBjb25zdCBzdGF0dXNDaGFyYWN0ZXJpc3RpYyA9IHNlcnZpY2VzQ2hhcmFjdGVyaXN0aWMuZmluZCgoYykgPT4gYy51dWlkID09PSBzZXJ2aWNlVXVpZC5jaGVja1V1aWQpO1xuICAgICAgICBjb25zdCByZXNwb25zZUNoYXJhY3RlcmlzdGljID0gc2VydmljZXNDaGFyYWN0ZXJpc3RpYy5maW5kKChjKSA9PiBjLnV1aWQgPT09IHNlcnZpY2VVdWlkLnJlYWRVdWlkKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgIGNvbW1hbmRDaGFyYWN0ZXJpc3RpYyxcbiAgICAgICAgICBkYXRhQ2hhcmFjdGVyaXN0aWMsXG4gICAgICAgICAgc3RhdHVzQ2hhcmFjdGVyaXN0aWMsXG4gICAgICAgICAgcmVzcG9uc2VDaGFyYWN0ZXJpc3RpYyxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciBhbnkgY2hhcmFjdGVyaXN0aWMgaXMgbnVsbFxuICAgICAgICBpZiAoT2JqZWN0LnZhbHVlcyhyZXN1bHQpLnNvbWUoaXNOaWwpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSlcbiAgICApLnRoZW4oKHJlcykgPT4gcmVzLmZpbHRlcigocikgPT4gIWlzTmlsKHIpKSk7XG5cbiAgICBjb25zdCBjaGFyYWN0ZXJpc3RpYyA9IGxhc3QoY2hhcmFjdGVyaXN0aWNzKTtcbiAgICBpZiAoaXNOaWwoY2hhcmFjdGVyaXN0aWNzKSkgdGhyb3cgbmV3IGVycm9yLlRyYW5zcG9ydEVycm9yKHRoaXMuY29ubmVjdC5uYW1lLCAnY2hhcmFjdGVyaXN0aWMgbm90IGZvdW5kJyk7XG5cbiAgICBjb25zdCBjb21tYW5kQ2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYz8uY29tbWFuZENoYXJhY3RlcmlzdGljO1xuICAgIGNvbnN0IGRhdGFDaGFyYWN0ZXJpc3RpYyA9IGNoYXJhY3RlcmlzdGljPy5kYXRhQ2hhcmFjdGVyaXN0aWM7XG4gICAgY29uc3Qgc3RhdHVzQ2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYz8uc3RhdHVzQ2hhcmFjdGVyaXN0aWM7XG4gICAgY29uc3QgcmVzcG9uc2VDaGFyYWN0ZXJpc3RpYyA9IGNoYXJhY3RlcmlzdGljPy5yZXNwb25zZUNoYXJhY3RlcmlzdGljO1xuICAgIGlmIChpc05pbChjb21tYW5kQ2hhcmFjdGVyaXN0aWMpKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3IuVHJhbnNwb3J0RXJyb3IodGhpcy5jb25uZWN0Lm5hbWUsICdjb21tYW5kQ2hhcmFjdGVyaXN0aWMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGlmIChpc05pbChkYXRhQ2hhcmFjdGVyaXN0aWMpKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3IuVHJhbnNwb3J0RXJyb3IodGhpcy5jb25uZWN0Lm5hbWUsICdkYXRhQ2hhcmFjdGVyaXN0aWMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGlmIChpc05pbChzdGF0dXNDaGFyYWN0ZXJpc3RpYykpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvci5UcmFuc3BvcnRFcnJvcih0aGlzLmNvbm5lY3QubmFtZSwgJ3N0YXR1c0NoYXJhY3RlcmlzdGljIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoaXNOaWwocmVzcG9uc2VDaGFyYWN0ZXJpc3RpYykpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvci5UcmFuc3BvcnRFcnJvcih0aGlzLmNvbm5lY3QubmFtZSwgJ3Jlc3BvbnNlQ2hhcmFjdGVyaXN0aWMgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgdGhpcy50cmFuc3BvcnQgPSBuZXcgUk5CbGVUcmFuc3BvcnQoXG4gICAgICBkZXZpY2UsXG4gICAgICBjb21tYW5kQ2hhcmFjdGVyaXN0aWMsXG4gICAgICBkYXRhQ2hhcmFjdGVyaXN0aWMsXG4gICAgICBzdGF0dXNDaGFyYWN0ZXJpc3RpYyxcbiAgICAgIHJlc3BvbnNlQ2hhcmFjdGVyaXN0aWNcbiAgICApO1xuICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydDtcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgc3BlY2lmaWMgZGV2aWNlIGJ5IGlkLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgZGV2aWNlIGlkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGRpc2Nvbm5lY3RlZEJ5SWQgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHRoaXMuYmxlTWFuYWdlci5jYW5jZWxEZXZpY2VDb25uZWN0aW9uKGlkKTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdCBhbGwgZGV2aWNlcyB0aGF0IGJsZU1hbmFnZXIgY29ubmVjdGVkLlxuICAgKi9cbiAgZGlzY29ubmVjdCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBHZXQgYWxsIGNvbm5lY3RlZCBibHVldG9vdGggZGV2aWNlcyBhbmQgZGlzY29ubmVjdCB0aGVtLlxuICAgIGNvbnN0IGNvbm5lY3RlZERldmljZXMgPSBhd2FpdCB0aGlzLmJsZU1hbmFnZXIuY29ubmVjdGVkRGV2aWNlcyh0aGlzLnV1aWRzKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChjb25uZWN0ZWREZXZpY2VzLm1hcCgoeyBpZCB9KSA9PiB0aGlzLmRpc2Nvbm5lY3RlZEJ5SWQoaWQpKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJOQmxlTWFuYWdlcjtcbiJdfQ==