const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "new_event", "update_event"
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", NotificationSchema);
