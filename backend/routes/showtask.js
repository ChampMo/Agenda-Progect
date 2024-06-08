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

router.post("/api/getroletask", async (req,res)=>{
    try{
        const { task_id } = req.body;
        const roletask = await RoleTask.find({ task_id });
        console.log(roletask)

        const results = await Promise.all(
            roletask.map(async (rt) => {
                const { role_id, task_id } = rt;
                // ค้นหา role ในตาราง Role โดยใช้ role_id
                const role = await Role.findOne({ role_id });
                return {
                    task_id: task_id,
                    role_id: role_id,
                    role_name: role.role_name,
                    color: role.color
                };
            })
        );
        res.json({results, massage: "Get Role Task successfully!"})
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/api/getusertask", async (req,res)=>{
    try {
        const { workspace_id } = req.body;

        // ค้นหา role_ids ที่เกี่ยวข้องกับ user_id จาก RoleUser
        const userRoles = await RoleUser.find({ user_id: req.session.userId });
        if (userRoles.length === 0) {
            return res.status(404).json({ error: "User roles not found" });
        }

        // ดึง role_ids ทั้งหมด
        const roleIds = userRoles.map(roleUser => roleUser.role_id);

        // ค้นหา role_ids ที่ตรงกับ workspace_id จาก Role
        const roles = await Role.find({ workspace_id: workspace_id, role_id: { $in: roleIds } });
        if (roles.length === 0) {
            return res.status(404).json({ error: "Roles not found for the specified workspace_id and user" });
        }

        // ดึง task_ids ทั้งหมดจาก role_ids
        let taskIds = [];
        for (let role of roles) {
            const roleTasks = await RoleTask.find({ role_id: role.role_id });
            taskIds = taskIds.concat(roleTasks.map(rt => rt.task_id));
        }

        // ส่ง task_ids กลับไปยัง frontend
        return res.json({ taskIds, message: "Send My Task successfully!" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


export default router;
