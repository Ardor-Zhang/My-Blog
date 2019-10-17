import express from 'express';
import UsersModel from '../models/usersModel';
import svgCaptcha from 'svg-captcha';
import { isEmpty, equals , isLength} from 'validator';
import multer from 'multer';   // 用于上传图片
import fs from 'fs';  
import jwt from 'jsonwebtoken';  // jwt
import config from './config'

let upload = multer({ dest: '../../client/src/assets/profile/' })  // 设置上传头像的文件的存储目录

let Router = express.Router();
let captchaText = "";

Router.post('/register',  (req, res) => {
    const { username, password, passwordConfirm, verification } = req.body;
    if( isEmpty(username) ){
        res.json({type : "warning" , content : "username can not be empty!" });
    }else if( isEmpty(password) ){
        res.json({type : "warning" , content : "password can not be empty!" });
    }else if( !isLength(password, { min : 6, max : 18 })){
        res.json({type : "warning" , content : "password length shoule be 6 to 18" });
    }else if( isEmpty(passwordConfirm) ){
        res.json({type : "warning" , content : "passwordConfirm can not be empty!" });
    }else if( isEmpty(verification) ){
        res.json({type : "warning" , content : "verification can not be empty!" });
    }else if( !equals(passwordConfirm,password) ){
        res.json({type : "warning" , content : "Both passwords must be the same!" });
    }else if( !equals(verification.toLowerCase(), captchaText.toLowerCase()) ){
        res.json({type : "warning" , content : "captcha must be the same!" }); 
    }else{
        UsersModel.findOne({ username }).then(
            (info) => { 
                if( info ){
                    res.json({type : "warning" , content : "username exists, please change another one!" });
                }else{
                    const dateRegister = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
                    UsersModel.insertMany({username, password, dateRegister}).then(
                        ()=>{
                            res.json({type : "success", content : "Congratulations, registration is successful!"});
                        }).catch(
                        (err) => {
                            res.json(err);
                    });
                }
            }
        );
    }
})

Router.post('/register_checkusername',  (req, res) => {
    const { username } = req.body;
    if(username){
        UsersModel.findOne({ username }).then(
            (info) => { 
                if( info ){
                    res.json({type : "warning" , content : "username exists, please change another one!" });
                }else{
                    res.json({type : "success", content : "username available"});
                }    
            });
        }
})

Router.post('/login',  (req, res) => {
    const { username, password } = req.body;
    if( isEmpty(username) ){
        res.json({type : "warning" , content : "username can not be empty!" });
    }else if( isEmpty(password) ){
        res.json({type : "warning" , content : "password can not be empty!" });
    }else{ UsersModel.findOne({username}).then(
        (info) => {
            if(info.password === password){
                const token = jwt.sign({
                    id : info._id,
                    username : info.username,
                    profile : info.profile
                }, config.jwtSecret)
                res.json({ type : "success", content : "Login Successfully! Welcome !" , token});
            }else{
                res.json({type : "warning", content : "Wrong username or password, please amend it!" });
            } 
        }
    ).catch(
        () => {
            res.json({type : "warning", content : "Wrong username or password, please amend it!" });
        }
    )
    }
})

Router.post('/captcha',(req, res) => {
    let captcha = svgCaptcha.create({
        size: 4,
        noise: 1,
        color: true,
        background: '#cc9966'
    });
    // req.session.captcha = captcha.text;  // 不知道官网为什么要设置这一句, 是用来存储 验证码的
    captchaText = captcha.text;
    res.type('svg');
    res.json(captcha.data);
})

Router.post('/profile', upload.single('profile'), function (req, res, next) {  
    const { username } = req.query  // 这里居然是用前端传来的， 以后再修改
    fs.rename(req.file.path, req.file.destination + username + '.jpg', () => {});
})

export default Router;