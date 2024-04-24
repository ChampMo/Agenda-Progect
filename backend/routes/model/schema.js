const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    user_id:String,
    username:String,
    email:String,
    password:String,
    picture:String
});

const RoleUserSchema = new Schema({
    role_id:String,
    user_id:String
});



const Users = mongoose.model('User', UserSchema);
const RoleUser = mongoose.model('RoleUser', RoleUserSchema);

// Users.collection.drop();
// RoleUser.collection.drop();

module.exports = { Users, RoleUser }; 





















