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

// router.post("/api/getroletask", async (req,res)=>{
//     try{
//         const { workspace_id } = req.body;
//         const task = await Task.find({workspace_id});
//         const task_id = task.map(task => task.task_id);

//         const roleTask = await RoleTask.find({task_id});
//         const role_id = roleTask.map(roleTask => roleTask.role_id);

//         const role = await Role.find({role_id});

       
//         res.json({task, task_id, role_id, roleTask, role, massage: "Send Task successfully!"});

        
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// })

router.post("/api/getroletask", async (req,res)=>{
    try {
        const { workspace_id } = req.body;

        // Find roles based on workspace_id
        const roles = await Role.find({ workspace_id });
        const roleMap = roles.reduce((map, role) => {
            map[role.role_id] = role.role_name; // Pair role_id with role_name
            return map;
        }, {});

        // Find role tasks based on role_id
        const roleTasks = await RoleTask.find({ role_id: { $in: Object.keys(roleMap) } });

        // Create a map to store task_ids for each role_id
        const roleTasksMap = {};
        roleTasks.forEach(roleTask => {
            if (!roleTasksMap[roleTask.role_id]) {
                roleTasksMap[roleTask.role_id] = [];
            }
            roleTasksMap[roleTask.role_id].push(roleTask.task_id);
        });

        // Fetch task details for each task_id
        const taskDetailsMap = {};
        for (const roleId of Object.keys(roleTasksMap)) {
            const taskIds = roleTasksMap[roleId];
            const tasks = await Task.find({ task_id: { $in: taskIds } });
            taskDetailsMap[roleMap[roleId]] = tasks; // Use role name as key instead of role_id
        }

        // Convert taskDetailsMap to the desired format
        const formattedData = Object.entries(taskDetailsMap).map(([roleName, tasks]) => ({
            roleName,
            tasks
        }));

        res.json({ formattedData, message: "Send Task successfully!" });
    

    // try{
    //     const { workspace_id } = req.body;
    //     // Fetch tasks by workspace_id
    //     const tasks = await Task.find({ workspace_id });
    //     const task_ids = tasks.map(task => task.task_id);

    //     // Fetch RoleTask entries using task_ids
    //     const roleTasks = await RoleTask.find({ task_id: { $in: task_ids } });
    //     const role_ids = roleTasks.map(roleTask => roleTask.role_id);

    //     // Fetch Roles using role_ids
    //     const roles = await Role.find({ role_id: { $in: role_ids } });

    //     // Combine tasks and roles based on roleTasks
    //     const allTask = tasks.map(task => {
    //     const relatedRoleTasks = roleTasks.filter(rt => rt.task_id === task.task_id);
    //     const relatedRoles = relatedRoleTasks.map(rt => roles.find(role => role.role_id === rt.role_id));

    //     return {
    //         ...task._doc, // Use _doc to access the raw task document
    //         roles: relatedRoles
    //     };
    //     });
    //     res.json({allTask, massage: "Get Role Task successfully!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  

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
