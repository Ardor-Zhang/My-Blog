'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _articlesModel = require('../models/articlesModel');

var _articlesModel2 = _interopRequireDefault(_articlesModel);

var _validator = require('validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.post('/addArticle', function (req, res) {
    var _req$body = req.body,
        type = _req$body.type,
        title = _req$body.title,
        content = _req$body.content;

    if ((0, _validator.isEmpty)(type)) {
        res.json({ type: "warning", content: "type can not be empty!" });
    } else if ((0, _validator.isEmpty)(title)) {
        res.json({ type: "warning", content: "title can not be empty!" });
    } else if ((0, _validator.isEmpty)(content)) {
        res.json({ type: "warning", content: "content can not be empty!" });
    } else {
        var datePost = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
        _articlesModel2.default.insertMany({ type: type, title: title, content: content, datePost: datePost, times_of_view: 0, times_of_praise: 0, remarks: '' }).then(function () {
            res.json({ type: "success", content: "Congratulations, AddArticle is successful!" });
        }).catch(function (err) {
            res.json(err);
        });
    }
});

Router.post('/get_all_articles', function (req, res) {
    _articlesModel2.default.find().then(function (infos) {
        res.json({ type: "success", content: "Congratulations, GetItem is successful!", infos: infos });
    }).catch(function (err) {
        res.json(err);
    });
});

Router.post('/add_view_time', function (req, res) {
    var _id = req.body._id;

    _articlesModel2.default.update({ _id: _id }, { $inc: { times_of_view: 1 } }).then(function (infos) {
        res.json({ type: "success" });
    }).catch(function (err) {
        res.json(err);
    });
});

exports.default = Router;
//# sourceMappingURL=articles.js.map