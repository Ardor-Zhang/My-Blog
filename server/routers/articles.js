import express from 'express';
import ArticlesModel from '../models/articlesModel';
import { isEmpty } from 'validator';

let Router = express.Router();

Router.post('/addArticle', (req, res) => {
    const { type, title, content } = req.body;
    if( isEmpty(type) ){
        res.json({type : "warning" , content : "type can not be empty!" });
    }else if( isEmpty(title) ){
        res.json({type : "warning" , content : "title can not be empty!" });
    }else if( isEmpty(content) ){
        res.json({type : "warning" , content : "content can not be empty!" });
    }else{
        let datePost = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
        ArticlesModel.insertMany({ type, title, content, datePost, times_of_view : 0, times_of_praise : 0, remarks : '' }).then(
            ()=>{
                res.json({type : "success", content : "Congratulations, AddArticle is successful!"});
            }).catch(
            (err) => {
                res.json(err);
        });
}})

Router.post('/get_all_articles', (req, res) => {
    ArticlesModel.find().then( 
        (infos) => {
            res.json({type : "success", content : "Congratulations, GetItem is successful!", infos});
        }).catch(
            (err) => {
                res.json(err);
            }
        );
})

export default Router;