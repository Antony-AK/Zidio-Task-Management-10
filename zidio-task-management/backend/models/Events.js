const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },
  color: { type: String, default: "bg-blue-300" },

  createdBy: {
    role: { type: String, default: 'admin' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", EventSchema);
