"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlRelay = require("graphql-relay");

var connectionFromMongooseQuery =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(sourceQuery, args) {
    var after, before, first, last, Query, totalCount, beforeOffset, afterOffset, startOffset, endOffset;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            after = args.after, before = args.before, first = args.first, last = args.last;
            Query = sourceQuery.toConstructor();
            _context.next = 4;
            return new Query().countDocuments();

          case 4:
            totalCount = _context.sent;
            beforeOffset = (0, _graphqlRelay.getOffsetWithDefault)(before, totalCount);
            afterOffset = (0, _graphqlRelay.getOffsetWithDefault)(after, -1);
            startOffset = Math.max(0 - 1, afterOffset, -1) + 1;
            endOffset = Math.min(totalCount, beforeOffset, totalCount);

            if (!(typeof first === 'number')) {
              _context.next = 13;
              break;
            }

            if (!(first < 0)) {
              _context.next = 12;
              break;
            }

            throw new Error('Argument "first" must be a non-negative integer');

          case 12:
            endOffset = Math.min(endOffset, startOffset + first);

          case 13:
            if (!(typeof last === 'number')) {
              _context.next = 17;
              break;
            }

            if (!(last < 0)) {
              _context.next = 16;
              break;
            }

            throw new Error('Argument "last" must be a non-negative integer');

          case 16:
            startOffset = Math.max(startOffset, endOffset - last);

          case 17:
            _context.t0 = _objectSpread2["default"];
            _context.t1 = {};
            _context.t2 = _graphqlRelay.connectionFromArraySlice;
            _context.next = 22;
            return new Query().skip(startOffset).limit(last);

          case 22:
            _context.t3 = _context.sent;
            _context.t4 = args;
            _context.t5 = {
              sliceStart: startOffset,
              arrayLength: totalCount
            };
            _context.t6 = (0, _context.t2)(_context.t3, _context.t4, _context.t5);
            _context.t7 = {
              totalCount: totalCount
            };
            return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t6, _context.t7));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectionFromMongooseQuery(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = connectionFromMongooseQuery;
exports["default"] = _default;
