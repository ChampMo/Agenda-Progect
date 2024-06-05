import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import {
  User,
  UserWorkspace,
  Workspace,
  Task,
  RoleTask,
  RoleUser,
  Role,
} from "./model/schema.js";

import dotenv from 'dotenv';

dotenv.config();


const nosqlconect = process.env.NOSQLCONECT ;
mongoose.connect(nosqlconect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:")
);

export default router;
