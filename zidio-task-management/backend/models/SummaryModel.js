const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
    totalProjects: { type: Number, required: true, default: 0 },
    endedProjects: { type: Number, required: true, default: 0 },
    pendingProjects: { type: Number, required: true, default: 0 },
    runningProjects: { type: Number, required: true, default: 0 },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }] 
});

const Summary = mongoose.model("Summary", SummarySchema);
module.exports = Summary;
