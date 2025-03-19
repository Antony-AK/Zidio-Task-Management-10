const express = require("express");
const Event = require("../models/Events");
const Notification = require("../models/Notification");
const router = express.Router();

module.exports = (io) => {

    // ✅ Get all events
    router.get("/", async (req, res) => {
        try {
            const events = await Event.find();
            res.json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Add a new event (Trigger Notification)
    router.post("/addevent", async (req, res) => {
        console.log("🔥 /addevent API called");
        try {
            const { title, description, date, startTime, endTime, color } = req.body;

            // Basic validation
            if (!title || !description || !date || !startTime || !endTime) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Save the event
            const newEvent = new Event({ title, description, date, startTime, endTime, color });
            await newEvent.save();
            console.log("✅ Event saved:", newEvent);

            // Save notification
            const notification = new Notification({
                message: `📅 ${title} : ${date}`,
                type: "new_event",
                eventId: newEvent._id
            });
            await notification.save();
            console.log("✅ Notification saved:", notification);

            // Emit real-time notification
            io.emit("receiveNotification", {
                type: "new_event",
                message: `📅 ${title} : ${date}`,
            });
            console.log("🚀 Notification emitted");

            res.status(201).json({ message: "Event added successfully", newEvent });
        } catch (error) {
            console.error("❌ Error adding event:", error);
            res.status(500).json({ error: error.message });
        }
    });

    // ✅ Update event (Trigger Notification)
    router.put("/:id", async (req, res) => {
        try {
            const { title, description, date, startTime, endTime, color } = req.body;

            const updatedEvent = await Event.findByIdAndUpdate(
                req.params.id,
                { title, description, date, startTime, endTime, color },
                { new: true }
            );

            if (!updatedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }

            // Save update notification
            const notification = new Notification({
                message: `🔄 Event Updated: ${title}`,
                type: "update_event",
                eventId: req.params.id
            });
            await notification.save();

            // Emit update notification
            io.emit("receiveNotification", {
                type: "update_event",
                message: `🔄 Event Updated: ${title}`,
            });

            res.json({ message: "Event updated successfully", updatedEvent });
        } catch (error) {
            console.error("❌ Error updating event:", error);
            res.status(500).json({ message: "Error updating event", error });
        }
    });

    // ✅ Delete event (Trigger Notification)
    router.delete("/:id", async (req, res) => {
        try {
            const deletedEvent = await Event.findByIdAndDelete(req.params.id);
            if (!deletedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }

            // Save delete notification
            const notification = new Notification({
                message: `❌ Event Deleted: ${deletedEvent.title}`,
                type: "delete_event",
                eventId: req.params.id
            });
            await notification.save();

            // Emit delete notification
            io.emit("receiveNotification", {
                type: "delete_event",
                message: `❌ Event Deleted: ${deletedEvent.title}`,
            });

            res.json({ message: "Event deleted successfully", deletedEvent });
        } catch (error) {
            console.error("❌ Error deleting event:", error);
            res.status(500).json({ message: "Error deleting event", error });
        }
    });

    return router;
};
