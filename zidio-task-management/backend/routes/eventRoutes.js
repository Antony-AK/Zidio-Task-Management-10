const express = require("express");
const Event = require("../models/Events");
const router = express.Router();

//get the events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//add new event
router.post("/addevent", async (req, res) => {
    try {
        const { title, description, date, startTime, endTime, color } = req.body;
        if (!title || !description || !date || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({ title, description, date, startTime, endTime, color});
        await newEvent.save();
        res.status(201).json({newEvent});
    } catch (error){
        res.status(500).json({ error: error.message});
    }
});

//update event
router.put("/:id", async (req, res)=> {
    try{
        const {title, description, date, startTime, endTime, color} = req.body;
        const updateEvent = await Event.findByIdAndUpdate(req.params.id, 
            {title, description, date, startTime, endTime, color},
            {new : true}
        );
        if(!updateEvent){
            return res.status(404).json({message: "Event not found"});
        }
        res.json(updateEvent);
    } catch(error){
        res.status(500).json({message: "Error updating  event", error});
    }
});

//delete event
router.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json({ message: "Event deleted successfully", deletedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
});
module.exports = router;