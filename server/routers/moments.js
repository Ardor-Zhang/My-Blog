import express from 'express';
import MomtensModel from '../models/momentsModel';
import { isEmpty } from 'validator';

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