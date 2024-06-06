import express from 'express';
import session from 'express-session'

import { User, UserWorkspace, Workspace, Task, ShareRequest, RoleTask, RoleUser, Role } from './model/schema.js';
const router = express.Router();



router.get("/api/profileInfo/", async (req, res) => {
    try {
        console.log(req.session.userId, "req.session.userId")
        const result = await User.findOne({user_id:req.session.userId});

        return res.json({
            userInfo:result,
            massage: "Send userInfo Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




export default router;
