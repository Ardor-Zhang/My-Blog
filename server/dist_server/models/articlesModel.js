'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var articlesSchema = new _mongoose2.default.Schema({
    type: String,
    title: String,
    content: String,
    datePost: String,
    times_of_view: Number,
    times_of_praise: Number,
    remarks: String
});

var ArticlesModel = _mongoose2.default.model('articles', articlesSchema);

exports.default = ArticlesModel;
//# sourceMappingURL=articlesModel.js.map