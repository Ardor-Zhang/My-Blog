'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var momentsSchema = new _mongoose2.default.Schema({
    title: String,
    content: String,
    datePost: String
});

var MomentsModel = _mongoose2.default.model('mometns', momentsSchema);

exports.default = MomentsModel;
//# sourceMappingURL=momentsModel.js.map