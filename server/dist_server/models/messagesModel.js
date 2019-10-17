'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messagesSchema = new _mongoose2.default.Schema({
    username: String,
    profile: Buffer,
    content: String,
    datePost: String
});

var MessagesModel = _mongoose2.default.model('messages', messagesSchema);

exports.default = MessagesModel;
//# sourceMappingURL=messagesModel.js.map