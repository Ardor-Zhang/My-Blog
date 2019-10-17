import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema({
    username : String,
    profile : Buffer,
    content : String,
    datePost : String
});

const MessagesModel = mongoose.model('messages', messagesSchema);

export default MessagesModel;