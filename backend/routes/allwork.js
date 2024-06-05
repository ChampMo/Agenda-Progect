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

        return res.json({
            error: "Create Workspace Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;
