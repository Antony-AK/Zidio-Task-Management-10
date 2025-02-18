const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        console.log("🔹 Auth middleware triggered...");

        const token = req.header("Authorization");
        if (!token) {
            console.error("❌ No token provided!");
            return res.status(401).json({ message: "Access Denied: No token" });
        }

        const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        console.log("🔹 Extracted Token:", actualToken);

        const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
        console.log("✅ Verified Token:", verified);

        if (!verified.id) {
            console.error("❌ Invalid Token Payload!");
            return res.status(401).json({ message: "Invalid Token" });
        }

        req.user = { id: verified.id };
        console.log("🔹 User authenticated:", req.user.id);
        
        next();
    } catch (err) {
        console.error("❌ Auth Middleware Error:", err.message);
        res.status(500).json({ message: "Authentication failed", error: err.message });
    }
};

module.exports = auth;
