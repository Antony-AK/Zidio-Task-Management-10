const mongoose = require("mongoose");

const MembersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profile: { type: String, required: true },
});

const TaskSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },     status: { 
        type: String, 
        enum: ["TODO", "In Progress", "Review", "Done"],
        required: true 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    members: { type: Number, required: true },
    profilePics: [{ type: String, required: true }],
    discussions: { type: Number, default: '' },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    completedAt: { type: Date } 
});

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Done"], default: "Pending" }, // Fixed status
    manager: { type: String, required: true }, 
    members: [MembersSchema], default: [], 
    tasks: [TaskSchema], default: [], 
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);