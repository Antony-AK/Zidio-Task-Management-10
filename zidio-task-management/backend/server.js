const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http"); 
const { Server } = require("socket.io");

dotenv.config();
const app = express();
const server = http.createServer(app); 

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const projectRoutes = require("./routes/projectRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const Message = require("./models/Message");  

app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/uploads", uploadRoutes);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", async (socket) => {
    console.log("🟢 User Connected:", socket.id);

    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        socket.emit("loadMessages", messages);
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
    }

    socket.on("sendMessage", async (data) => {
        console.log("📩 Message received:", data);

        try {
            const newMessage = new Message({
                text: data.text,
                sender: data.sender,
                createdAt: new Date(),
            });

            await newMessage.save();  
            io.emit("receiveMessage", newMessage);  
        } catch (error) {
            console.error("❌ Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("🔴 User Disconnected:", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("✅ Backend is running!");
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => { 
    console.log(`✅ Server is running on port ${PORT}`);
});
