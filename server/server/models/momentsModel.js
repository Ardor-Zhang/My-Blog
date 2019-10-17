import mongoose from 'mongoose';

const momentsSchema = new mongoose.Schema({
    title : String,
    content : String,
    datePost : String
});

const MomentsModel = mongoose.model('mometns', momentsSchema);

export default MomentsModel;