import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    username : String,
    password : String,
    dateRegister : String
});

const UsersModel = mongoose.model('users', usersSchema);

export default UsersModel;