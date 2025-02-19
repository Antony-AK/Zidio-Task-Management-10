const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use('/uploads', express.static('public/images'));

// Import routes
const projectRoutes = require("./routes/projectRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
    res.send("✅ Backend is running!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
