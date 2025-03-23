const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http"); 
const { Server } = require("socket.io");
const Event = require("./models/Events");
const Message = require("./models/Message");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);

// Setup io before passing to routes
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const projectRoutes = require("./routes/projectRoutes");
const eventRoutes = require("./routes/eventRoutes")(io); // Pass io here
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api", notificationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/uploads", uploadRoutes);

// Socket.io connections
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

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

// Deadline checking function
// const checkDeadlines = async () => {
//     try {
//         const now = new Date();
//         const dueEvents = await Event.find({ deadline: { $lte: now } });
//         dueEvents.forEach((event) => {
//             io.emit("receiveNotification", {
//                 type: "deadline_event",
//                 message: `⏳ Deadline Reached: ${event.title}`,
//             });
//         });
//     } catch (error) {
//         console.error("❌ Error checking deadlines:", error);
//     }
// };

// setInterval(checkDeadlines, 87000);
