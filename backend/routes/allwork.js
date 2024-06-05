import express from 'express';
import session from 'express-session'

import {
    User,
    UserWorkspace,
    Workspace,
    Task,
    RoleTask,
    RoleUser,
    Role,
} from './model/schema.js';

const router = express.Router();


router.get("/api/create/workspace/", async (req, res) => {
    try {
        console.log(req.session.userId, "req.session.userId");
        let lastId = await Workspace.findOne()
            .sort({ workspace_id: -1 })
            .limit(1);
        let nextId
        if(lastId === null){
            nextId = 0;
        }else{
            nextId = parseInt(lastId.workspace_id) + 1;
        }

        Workspace.create([
            { workspace_id: nextId, workspace_name: 'Workspace Name', workspace_icon: '', workspace_create_date: new Date()},
        ]);

        UserWorkspace.create([
            { user_id:req.session.userId, workspace_id: nextId, Date_time: new Date(), status_workspace: 'success'},
        ]);

        return res.json({
            workspace_id:nextId,
            massage: "Create Workspace Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/api/allwork/", async (req, res) => {
    try {
        const result = await UserWorkspace.find({user_id:req.session.userId});
        return res.json({
            allWorkspace:result,
            massage: "Create Task Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;
