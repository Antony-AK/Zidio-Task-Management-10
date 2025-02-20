const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword, role: role || "user" });
        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, "your_secret_key", { expiresIn: "1h" });

        res.status(201).json({ 
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token 
        });
    } catch (err) {
        console.error("❌ Signup Error:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id  }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            isAuthenticated: true, 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        console.error("❌ User Fetch Error:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;