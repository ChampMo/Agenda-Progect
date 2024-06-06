import express from 'express';
import session from 'express-session'

import { User, UserWorkspace, Workspace, Task, ShareRequest, RoleTask, RoleUser, Role } from './model/schema.js';
const router = express.Router();


router.post("/api/addtask/", async (req,res)=>{
    try{
        const data = req.body.data
        const workspace_id = req.body.workspace_id;
        const task_name = data.taskname;
        const task_create_date = Date.now();
        const note = data.note;
        const task_due_date = new Date(data.duedate);
        const status_task = data.status;

        const task_id = await Task.findOne().sort({ task_id:-1 }).limit(1); 
        const result = await Task.create({task_id:task_id === null ? 0 : task_id.task_id + 1,
            task_name, 
            task_create_date, 
            note, 
            task_due_date, 
            status_task, 
            workspace_id});
        console.log(result)
        return res.json({ result, massage: "Add Task successfully!" });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

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
