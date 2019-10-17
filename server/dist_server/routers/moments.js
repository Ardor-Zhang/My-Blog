'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _momentsModel = require('../models/momentsModel');

var _momentsModel2 = _interopRequireDefault(_momentsModel);

var _validator = require('validator');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)({ dest: '/img/momentPic/' }); // 设置动态图片的文件的存储目录

// 用于上传图片
var Router = _express2.default.Router();

Router.post('/addItem', function (req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        content = _req$body.content,
        picture = _req$body.picture;

    if ((0, _validator.isEmpty)(title)) {
        res.json({ type: "warning", content: "title can not be empty!" });
    } else if ((0, _validator.isEmpty)(content)) {
        res.json({ type: "warning", content: "content can not be empty!" });
    } else {
        var datePost = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
        _momentsModel2.default.insertMany({ title: title, content: content, picture: picture, datePost: datePost }).then(function () {
            res.json({ type: "success", content: "Congratulations, AddItem is successful!" });
        }).catch(function (err) {
            res.json(err);
        });
    }
});

Router.post('/picture', upload.single('momentPicture'), function (req, res, next) {
    var title = req.query.title; // 这里居然是用前端传来的， 以后再修改

    title && _fs2.default.rename(req.file.path, req.file.destination + title + '.jpg', function () {});
});

Router.post('/get_all_moments', function (req, res) {
    _momentsModel2.default.find().then(function (infos) {
        res.json({ type: "success", content: "Congratulations, GetItem is successful!", infos: infos });
    }).catch(function (err) {
        res.json(err);
    });
});

exports.default = Router;
//# sourceMappingURL=moments.js.map