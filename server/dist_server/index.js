"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _users = require("./routers/users");

var _users2 = _interopRequireDefault(_users);

var _moments = require("./routers/moments");

var _moments2 = _interopRequireDefault(_moments);

var _articles = require("./routers/articles");

var _articles2 = _interopRequireDefault(_articles);

var _messages = require("./routers/messages");

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // 应用级中间件
var mongoUrl = 'mongodb://localhost:27017/arrow_blog';
// console.log(__dirname)

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use(_bodyParser2.default.json());
app.use('/user', _users2.default);
app.use('/moment', _moments2.default);
app.use('/article', _articles2.default);
app.use('/message', _messages2.default);

app.use(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    res.send("404");
});

_mongoose2.default.connect(mongoUrl, function (err) {
    if (err) {
        console.log("数据库连接失败！");
        return;
    }
    console.log("数据库连接成功！");
    app.listen(8080, function (err) {
        if (err) console.log("服务器开启失败！");else console.log("服务器开启成功！");
    });
});
//# sourceMappingURL=index.js.map