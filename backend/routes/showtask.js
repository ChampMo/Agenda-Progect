import express from 'express';
import session from 'express-session'

import { User, UserWorkspace, Workspace, Task, ShareRequest, RoleTask, RoleUser, Role } from './model/schema.js';
const router = express.Router();


router.post("/api/gettask", async (req,res)=>{
    try{
        const { workspace_id } = req.body;
        const task = await Task.find({workspace_id});
        return res.json({ task , massage: "Send Task successfully!"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;
