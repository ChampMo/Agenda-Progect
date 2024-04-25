const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    user_id:String,
    username:String,
    email:String,
    password:String,
    picture:String
});

const UserWorkspaceSchema = new Schema({
    user_id:String,
    workspace_id:String,
    Date_time:Date,
    status_workspace:String
});

const WorkspaceSchema = new Schema({
    workspace_id:String,
    workspace_name:String,
    workspace_icon:String,
    workspace_create_date:Date
});

const TaskSchema = new Schema({
    task_id:String,
    workspace_id:String,
    task_name:String,
    task_create_date:Date,
    note:String,
    task_due_date:Date,
    status_task:String
});

const RoleTaskSchema = new Schema({
    role_id:String,
    task_id:String
});

const RoleUserSchema = new Schema({
    role_id:String,
    user_id:String
});

const RoleSchema = new Schema({
    role_id:String,
    workspace_id:String,
    role_name:String,
    color:String
});



const User = mongoose.model('User', UserSchema);
const UserWorkspace = mongoose.model('UserWorkspace', UserWorkspaceSchema);
const Workspace = mongoose.model('Workspace', WorkspaceSchema);
const Task = mongoose.model('Task', TaskSchema);
const RoleTask = mongoose.model('RoleTask', RoleTaskSchema);
const RoleUser = mongoose.model('RoleUser', RoleUserSchema);
const Role = mongoose.model('Role', RoleSchema);

module.exports = { User, UserWorkspace, Workspace, Task, RoleTask, RoleUser, Role }; 





















