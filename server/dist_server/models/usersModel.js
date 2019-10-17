'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersSchema = new _mongoose2.default.Schema({
    username: String,
    password: String,
    dateRegister: String
});

var UsersModel = _mongoose2.default.model('users', usersSchema);

exports.default = UsersModel;
//# sourceMappingURL=usersModel.js.map