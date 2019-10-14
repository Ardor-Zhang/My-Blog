import mongoose from 'mongoose';

const articlesSchema = new mongoose.Schema({
    type : String,
    title : String,
    content : String,
    datePost : String,
    times_of_view : Number,
    times_of_praise : Number,
    remarks : String
});

const ArticlesModel = mongoose.model('articles', articlesSchema);

export default ArticlesModel;