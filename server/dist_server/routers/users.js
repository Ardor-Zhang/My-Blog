'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _usersModel = require('../models/usersModel');

var _usersModel2 = _interopRequireDefault(_usersModel);

var _svgCaptcha = require('svg-captcha');

var _svgCaptcha2 = _interopRequireDefault(_svgCaptcha);

var _validator = require('validator');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)({ dest: '../client/public/img/profile/' }); // 设置上传头像的文件的存储目录

// jwt
// 用于上传图片
var Router = _express2.default.Router();
var captchaText = "";

Router.post('/register', function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password,
        passwordConfirm = _req$body.passwordConfirm,
        verification = _req$body.verification;

    if ((0, _validator.isEmpty)(username)) {
        res.json({ type: "warning", content: "username can not be empty!" });
    } else if ((0, _validator.isEmpty)(password)) {
        res.json({ type: "warning", content: "password can not be empty!" });
    } else if (!(0, _validator.isLength)(password, { min: 6, max: 18 })) {
        res.json({ type: "warning", content: "password length shoule be 6 to 18" });
    } else if ((0, _validator.isEmpty)(passwordConfirm)) {
        res.json({ type: "warning", content: "passwordConfirm can not be empty!" });
    } else if ((0, _validator.isEmpty)(verification)) {
        res.json({ type: "warning", content: "verification can not be empty!" });
    } else if (!(0, _validator.equals)(passwordConfirm, password)) {
        res.json({ type: "warning", content: "Both passwords must be the same!" });
    } else if (!(0, _validator.equals)(verification.toLowerCase(), captchaText.toLowerCase())) {
        res.json({ type: "warning", content: "captcha must be the same!" });
    } else {
        _usersModel2.default.findOne({ username: username }).then(function (info) {
            if (info) {
                res.json({ type: "warning", content: "username exists, please change another one!" });
            } else {
                var dateRegister = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
                _usersModel2.default.insertMany({ username: username, password: password, dateRegister: dateRegister }).then(function () {
                    res.json({ type: "success", content: "Congratulations, registration is successful!" });
                }).catch(function (err) {
                    res.json(err);
                });
            }
        });
    }
});

Router.post('/register_checkusername', function (req, res) {
    var username = req.body.username;

    if (username) {
        _usersModel2.default.findOne({ username: username }).then(function (info) {
            if (info) {
                res.json({ type: "warning", content: "username exists, please change another one!" });
            } else {
                res.json({ type: "success", content: "username available" });
            }
        });
    }
});

Router.post('/login', function (req, res) {
    var _req$body2 = req.body,
        username = _req$body2.username,
        password = _req$body2.password;

    if ((0, _validator.isEmpty)(username)) {
        res.json({ type: "warning", content: "username can not be empty!" });
    } else if ((0, _validator.isEmpty)(password)) {
        res.json({ type: "warning", content: "password can not be empty!" });
    } else {
        _usersModel2.default.findOne({ username: username }).then(function (info) {
            if (info.password === password) {
                var token = _jsonwebtoken2.default.sign({
                    id: info._id,
                    username: info.username,
                    profile: info.profile
                }, _config2.default.jwtSecret);
                res.json({ type: "success", content: "Login Successfully! Welcome !", token: token });
            } else {
                res.json({ type: "warning", content: "Wrong username or password, please amend it!" });
            }
        }).catch(function () {
            res.json({ type: "warning", content: "Wrong username or password, please amend it!" });
        });
    }
});

Router.post('/captcha', function (req, res) {
    var captcha = _svgCaptcha2.default.create({
        size: 4,
        noise: 1,
        color: true,
        background: '#cc9966'
    });
    // req.session.captcha = captcha.text;  // 不知道官网为什么要设置这一句, 是用来存储 验证码的
    captchaText = captcha.text;
    res.type('svg');
    res.json(captcha.data);
});

Router.post('/profile', upload.single('profile'), function (req, res, next) {
    var username = req.query.username; // 这里居然是用前端传来的， 以后再修改

    _fs2.default.rename(req.file.path, req.file.destination + username + '.jpg', function () {});
});

exports.default = Router;
//# sourceMappingURL=users.js.map