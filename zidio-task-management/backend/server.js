const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const Event = require("./models/Events");
const Message = require("./models/Message");
const notificationRoutes = require("./routes/notificationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:5173',
  'https://zidio-task-management-10-pvv9.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ CORS Error: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use("/api", notificationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes(io)); 
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/uploads", uploadRoutes);

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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

/** 
 * Deadline Checking (Optional)
 * Uncomment below to enable periodic deadline checks
 */
// const checkDeadlines = async () => {
//   try {
//     const now = new Date();
//     const dueEvents = await Event.find({ deadline: { $lte: now } });
//     dueEvents.forEach((event) => {
//       io.emit("receiveNotification", {
//         type: "deadline_event",
//         message: `⏳ Deadline Reached: ${event.title}`,
//       });
//     });
//   } catch (error) {
//     console.error("❌ Error checking deadlines:", error);
//   }
// };
// setInterval(checkDeadlines, 87000);
