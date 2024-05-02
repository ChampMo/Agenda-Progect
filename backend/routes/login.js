const Database = require("../routes/db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const {
    User,
    UserWorkspace,
    Workspace,
    Task,
    RoleTask,
    RoleUser,
    Role,
} = require("./model/schema");

//login
router.post("/api/login/", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (user === null) {
        return res.json({
            success: false,
            error: "Invalid username or password",
        });
        }
        console.log(password, user.password);
        const compare_result = await bcrypt.compare(password, user.password);
        console.log(compare_result, "compare_result");
        if (compare_result) {
        req.session.isLoggedIn = true;
        req.session.userId = user.user_id;
        console.log(req.session.isLoggedIn, "----", req.session.userId, "----");
        return res.json({ success: true });
        } else {
        return res.json({
            success: false,
            error: "Invalid username or password",
        });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//register
router.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.session.isLoggedIn, "----", req.session.userId, "+++");
    try {
        const user = await User.findOne({ email });
        if (user !== null) {
        // อีเมลถูกลงทะเบียนแล้ว
        res.json({ success: false });
        } else {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // ทำการ insert ข้อมูลลงในฐานข้อมูล

        let maxIdUser = await User.findOne()
            .sort({ user_id: -1 }) // Sort by ID in descending order
            .limit(1); // Limit to 1 document (the highest ID)
        let maxId = parseInt(maxIdUser.user_id);
        User.create([
            { user_id: ++maxId, email: email, password: hashedPassword },
        ]);
        console.log("Data inserted successfully");
        res.json({ success: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//logout

// router.get('/logout', (req, res) => {
//     req.session = null;

// });
router.get("/api/checklogin", async (req, res) => {
    const isLoggedInz = req.session.isLoggedIn;
    console.log(
        req.session.isLoggedIn,
        "----",
        req.session.userId,
        "----",
        req.session.uuu
    );
    if (isLoggedInz) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

router.post("/repassword", async (req, res) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const [oldPassword_compare] = await db.query(
        "SELECT * FROM Customer WHERE customer_id = ?",
        [req.session.userId]
    );
    // เรียกใช้ฟังก์ชันเปรียบเทียบและอัปเดตรหัสผ่าน
    const isUpdated = await bcrypt.compare(
        oldPassword,
        oldPassword_compare.password
    );
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    if (isUpdated) {
        if (newPassword.length >= 8) {
        db.query("UPDATE Customer SET password = ? WHERE customer_id = ?", [
            hashedPassword,
            req.session.userId,
        ]);
        res.json({ success: true, message: "รหัสผ่านอัปเดตสำเร็จ" });
        } else {
        res.json({
            success: false,
            message: "ไม่สามารถอัปเดตรหัสผ่านได้ (ใส่รหัสผ่านอย่างน้อย 8 ตัว)",
        });
        }
    } else {
        // ถ้าเกิดข้อผิดพลาดหรือไม่สามารถอัปเดตรหัสผ่านได้
        res
        .status(400)
        .json({
            success: false,
            message: "ไม่สามารถอัปเดตรหัสผ่านได้ (รหัสผ่านไม่ถูกต้อง)",
        });
    }
});

module.exports = router;
