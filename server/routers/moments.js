import express from 'express';
import MomtensModel from '../models/momentsModel';
import { isEmpty } from 'validator';

import multer from 'multer';   // 用于上传图片
import fs from 'fs';  
let upload = multer({ dest: '../client/src/assets/momentPic/' })  // 设置动态图片的文件的存储目录

let Router = express.Router();

Router.post('/addItem', (req, res) => {
    const { title, content, picture } = req.body;
    if( isEmpty(title) ){
        res.json({type : "warning" , content : "title can not be empty!" });
    }else if( isEmpty(content) ){
        res.json({type : "warning" , content : "content can not be empty!" });
    }else{
        let datePost = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
        MomtensModel.insertMany({ title, content, picture, datePost }).then(
            ()=>{
                res.json({type : "success", content : "Congratulations, AddItem is successful!"});
            }).catch(
            (err) => {
                res.json(err);
        });
}})

Router.post('/picture', upload.single('momentPicture'), function (req, res, next) {  
    const { title } = req.query  // 这里居然是用前端传来的， 以后再修改
    title && fs.rename(req.file.path, req.file.destination + title + '.jpg', () => {});
})

Router.post('/get_all_moments', (req, res) => {
    MomtensModel.find().then( 
        (infos) => {
            res.json({type : "success", content : "Congratulations, GetItem is successful!", infos});
        }).catch(
            (err) => {
                res.json(err);
            }
        );
})

export default Router;