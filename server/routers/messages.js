import express from 'express';
import MessagesModel from '../models/messagesModel';
import { isEmpty } from 'validator';

let Router = express.Router();

Router.post('/addMessage', (req, res) => {
    const { username, content } = req.body;
    if( isEmpty(content) ){
        res.json({type : "warning" , content : "content can not be empty!" });
    }else{
        let datePost = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
        MessagesModel.insertMany({ username, content, datePost }).then(
            ()=>{
                res.json({type : "success", content : "Congratulations, AddMessage is successful!"});
            }).catch(
            (err) => {
                res.json(err);
        });
}})

Router.post('/get_all_messages', (req, res) => {
    MessagesModel.find().then( 
        (infos) => {
            res.json({type : "success", content : "Congratulations, GetMessage is successful!", infos});
        }).catch(
            (err) => {
                res.json(err);
            }
        );
})

export default Router;