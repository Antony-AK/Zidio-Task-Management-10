const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },
  color: { type: String, default: "bg-blue-300" },
});

module.exports = mongoose.model("Event", EventSchema);
