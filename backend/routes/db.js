const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const  { User, UserWorkspace, Workspace, Task, RoleTask, RoleUser, Role } = require('./model/schema');

const nosqlconect = "mongodb+srv://Champ:1234@agendadb.erxhg96.mongodb.net/Agenda"
mongoose.connect(nosqlconect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:'));






module.exports = router;
