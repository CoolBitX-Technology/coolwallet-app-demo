"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hexToByteArray = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Convert hex string into number byte array
 * @param {string} hex
 * @returns {number[]}
 */
var hexToByteArray = function hexToByteArray(hex) {
  if ((0, _isEmpty["default"])(hex)) return [];
  var chunk = hex.match(/.{2}/g);
  return (0, _reduce["default"])(chunk, function (memo, curr) {
    memo.push(parseInt(curr, 16));
    return memo;
  }, []);
};

exports.hexToByteArray = hexToByteArray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6WyJoZXhUb0J5dGVBcnJheSIsImhleCIsImNodW5rIiwibWF0Y2giLCJtZW1vIiwiY3VyciIsInB1c2giLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsR0FBRCxFQUEyQjtBQUNoRCxNQUFJLHlCQUFRQSxHQUFSLENBQUosRUFBa0IsT0FBTyxFQUFQO0FBRWxCLE1BQU1DLEtBQUssR0FBR0QsR0FBRyxDQUFDRSxLQUFKLENBQVUsT0FBVixDQUFkO0FBRUEsU0FBTyx3QkFDTEQsS0FESyxFQUVMLFVBQUNFLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUNkRCxJQUFBQSxJQUFJLENBQUNFLElBQUwsQ0FBVUMsUUFBUSxDQUFDRixJQUFELEVBQU8sRUFBUCxDQUFsQjtBQUNBLFdBQU9ELElBQVA7QUFDRCxHQUxJLEVBTUwsRUFOSyxDQUFQO0FBUUQsQ0FiRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc0VtcHR5IGZyb20gJ2xvZGFzaC9pc0VtcHR5JztcbmltcG9ydCByZWR1Y2UgZnJvbSAnbG9kYXNoL3JlZHVjZSc7XG5cbi8qKlxuICogQ29udmVydCBoZXggc3RyaW5nIGludG8gbnVtYmVyIGJ5dGUgYXJyYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBoZXhcbiAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAqL1xuY29uc3QgaGV4VG9CeXRlQXJyYXkgPSAoaGV4OiBzdHJpbmcpOiBudW1iZXJbXSA9PiB7XG4gIGlmIChpc0VtcHR5KGhleCkpIHJldHVybiBbXTtcblxuICBjb25zdCBjaHVuayA9IGhleC5tYXRjaCgvLnsyfS9nKTtcblxuICByZXR1cm4gcmVkdWNlKFxuICAgIGNodW5rLFxuICAgIChtZW1vLCBjdXJyKSA9PiB7XG4gICAgICBtZW1vLnB1c2gocGFyc2VJbnQoY3VyciwgMTYpKTtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH0sXG4gICAgW10gYXMgbnVtYmVyW11cbiAgKTtcbn07XG5cbmV4cG9ydCB7IGhleFRvQnl0ZUFycmF5IH07XG4iXX0=