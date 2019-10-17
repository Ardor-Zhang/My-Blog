import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';

import users from "./routers/users";
import moments from "./routers/moments";
import articles from "./routers/articles";
import messages from "./routers/messages";

const app = express()  // 应用级中间件
const mongoUrl = 'mongodb://localhost:27017/arrow_blog';

app.use(bodyParser.json());
app.use('/user', users);
app.use('/moment', moments);
app.use('/article', articles);
app.use('/message', messages);

app.use((req, res) => {
    if( req.url === '/favicon.ico'){
        return;
    }
    res.send("404");
})

mongoose.connect(mongoUrl, (err) => {
    if(err) {
        console.log("数据库连接失败！");
        return;
    }
    console.log("数据库连接成功！");
    app.listen(8080, (err) => {
        if(err) console.log("服务器开启失败！");
        else console.log("服务器开启成功！");
    })
})