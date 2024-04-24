const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Users, RoleUser } = require('./model/schema');

const nosqlconect = "mongodb+srv://Champ:1234@agendadb.erxhg96.mongodb.net/Agenda"
mongoose.connect(nosqlconect);

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:'));






module.exports = router;
