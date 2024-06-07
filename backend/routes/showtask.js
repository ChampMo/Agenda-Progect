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

router.post("/api/getrole/task", async (req,res)=>{
    try{
        const { workspace_id, task_id } = req.body;
        const roleId = await RoleTask.find({task_id});
        console.log(roleId)
        const role = await Role.find({workspace_id, role_id: {$in: roleId.map(item => item.role_id)}});
        return res.json({ role , massage: "Send Role successfully!"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;
