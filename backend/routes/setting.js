import express from 'express';
import session from 'express-session'
import multer from 'multer';
import { supabase, upLoadPROFILE  } from '../supabaseClient.js';
import { User, UserWorkspace, Workspace, Task, ShareRequest, RoleTask, RoleUser, Role } from './model/schema.js';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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

router.post("/api/addrole/", async (req,res)=>{
    try{
        console.log(req.session.userId, "req.session.userId")
        const { workspace_id, role_name, color } = req.body;
        const role_id = await Role.findOne().sort({ role_id:-1 }).limit(1); 
        const result = await Role.create({role_id:role_id === null ? 0 : role_id.role_id + 1, workspace_id, role_name, color});
        return res.json({ result , massage: "Add Role successfully!"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/api/getrole", async (req,res)=>{
    try{
        const { workspace_id } = req.body;
        const role = await Role.find({workspace_id});
        return res.json({ role , massage: "Send Role successfully!"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.delete("/api/deleterole", async (req, res) => {
    try {
        const { role_id } = req.body;

        if (!role_id) {
            return res.status(400).json({ error: "Role ID is required" });
        }

        const result = await Role.deleteOne({ role_id: role_id });
        await RoleTask.deleteMany({ role_id: role_id });
        await RoleUser.deleteMany({ role_id: role_id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Role not found" });
        }

        return res.json({ message: "Role deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




router.post("/api/upload/profile", upload.single('profile'), async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
        }



        const file = req.file;
        console.log(file, "file")
        if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
        }

        const buffer = file.buffer;
        const fileName = file.originalname;

        const imageUrl = await upLoadPROFILE(buffer, userId, fileName);
        console.log('imageUrl',imageUrl)
        
        const updated = await User.findOne(
            { user_id: userId }
        );
        updated.picture = imageUrl;
        const updatedUser = await updated.save();
    
        return res.json({
            userInfo: updatedUser,
            message: "Image uploaded and profile updated successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
