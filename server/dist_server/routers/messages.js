'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _messagesModel = require('../models/messagesModel');

var _messagesModel2 = _interopRequireDefault(_messagesModel);

var _validator = require('validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.post('/addMessage', function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        content = _req$body.content,
        profile = _req$body.profile;

    if ((0, _validator.isEmpty)(content)) {
        res.json({ type: "warning", content: "content can not be empty!" });
    } else {
        var datePost = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
        _messagesModel2.default.insertMany({ username: username, content: content, datePost: datePost, profile: profile }).then(function () {
            res.json({ type: "success", content: "Congratulations, AddMessage is successful!" });
        }).catch(function (err) {
            res.json(err);
        });
    }
});

Router.post('/get_all_messages', function (req, res) {
    _messagesModel2.default.find().then(function (infos) {
        res.json({ type: "success", content: "Congratulations, GetMessage is successful!", infos: infos });
    }).catch(function (err) {
        res.json(err);
    });
});

exports.default = Router;
//# sourceMappingURL=messages.js.map