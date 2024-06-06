import express from 'express';
import session from 'express-session'

import { User, UserWorkspace, Workspace, Task, ShareRequest, RoleTask, RoleUser, Role } from './model/schema.js';
const router = express.Router();



// router.get("/api/profileInfo/", async (req, res) => {
//     try {
//         console.log(req.session.userId, "req.session.userId")
//         const result = await User.findOne({user_id:req.session.userId});

//         return res.json({
//             userInfo:result,
//             massage: "Send userInfo Successfully!",
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

router.post("/api/addrole/", async (req,res)=>{
    try{
        const {workspace_id,role_name,color} = req.body;
        const role_id = await Role.findOne().sort({role_id:-1}).limit(1);
        await Role.create({ role_id:role_id === null?0:role_id.role_id + 1, workspace_id, role_name, color });
        return res.json({role_id, massage: "Addrole successfully!"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;
