const express = require("express");
const Project = require("../models/Project");
const router = express.Router();
const mongoose = require('mongoose'); 


//add new task
router.post("/:projectId/tasks", async (req, res) => {
    console.log("Received project ID:", req.params.projectId);  

    try {
        const { projectId } = req.params;
        const { status, title, description, members, profilePics, discussions, priority } = req.body;

        console.log("Received request body:", req.body);

        const project = await Project.findById(projectId);
        if (!project) {
            console.log(`Project with ID ${projectId} not found in database.`);
            return res.status(404).json({ message: "Project not found" });
        }
        console.log("Found project:", project);  

        if (!status || !title || !description || !priority) {
            console.log("Missing required fields:", { status, title, description, priority });
            return res.status(400).json({ message: "Missing required fields" });
        }

        const validStatuses = ["TODO", "In Progress", "Review", "Done"];
        const validPriorities = ["High", "Medium", "Low"];
        if (!validStatuses.includes(status)) {
            console.log(`Invalid status: ${status}`);
            return res.status(400).json({ message: "Invalid status value" });
        }
        if (!validPriorities.includes(priority)) {
            console.log(`Invalid priority: ${priority}`);
            return res.status(400).json({ message: "Invalid priority value" });
        }


        const newTask = { 
            status, 
            title, 
            description, 
            members, 
            profilePics, 
            discussions, 
            priority 
        };
        console.log("New task to be added:", newTask);

        project.tasks.push(newTask);
        await project.save();

        res.status(201).json({ message: "Task added successfully", project });
    } catch (error) {
        console.error("Error in adding task:", error);
        res.status(500).json({ message: error.message });
    }
});





// Update task in project
router.put("/:projectId/tasks/:taskId", async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // Find the task correctly
        const task = project.tasks.find(t => t._id.toString() === taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Validate status and priority if provided
        if (req.body.status && !["TODO", "In Progress", "Review", "Done"].includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        if (req.body.priority && !["High", "Medium", "Low"].includes(req.body.priority)) {
            return res.status(400).json({ message: "Invalid priority value" });
        }

        // ✅ Correctly update task fields
        Object.assign(task, req.body);
        project.markModified("tasks"); // Ensure Mongoose tracks changes
        await project.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete task from project
router.delete("/:projectId/tasks/:taskId", async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        
        // Step 1: Debugging - Log the received projectId and taskId
        console.log(`Received request to delete task with ID: ${taskId} from project with ID: ${projectId}`);

        // Validate that project exists
        const project = await Project.findById(projectId);
        if (!project) {
            console.log(`Project with ID ${projectId} not found in database.`);
            return res.status(404).json({ message: "Project not found" });
        }
        console.log(`Project with ID ${projectId} found. Proceeding with task deletion.`);

        // Step 2: Debugging - Log the tasks before deletion
        console.log("Current tasks in the project:", project.tasks);

        // Convert taskId to ObjectId for comparison (necessary for Mongoose object comparison)
        const taskObjectId = new mongoose.Types.ObjectId(taskId);

        // Step 3: Debugging - Check if task exists in the project
        const taskIndex = project.tasks.findIndex(t => t._id.toString() === taskObjectId.toString());

        if (taskIndex === -1) {
            console.log(`Task with ID ${taskId} not found in project.`);
            return res.status(404).json({ message: "Task not found" });
        }
        console.log(`Task with ID ${taskId} found. Proceeding to delete.`);

        // Step 4: Debugging - Log the task that is about to be deleted
        console.log("Task to be deleted:", project.tasks[taskIndex]);

        // Step 5: Remove the task from the tasks array
        project.tasks.splice(taskIndex, 1);
        console.log("Task successfully removed. Updated tasks:", project.tasks);

        // Mark the tasks array as modified to ensure Mongoose saves the changes
        project.markModified("tasks");

        // Step 6: Debugging - Log the updated project before saving
        console.log("Saving the updated project with removed task:", project);

        // Save the updated project
        await project.save();
        console.log("Project saved successfully after task deletion.");

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        // Step 7: Debugging - Log the error
        console.error("Error in deleting task:", error);
        res.status(500).json({ message: error.message });
    }
});



// Bulk insert function
router.post("/bulk-insert", async (req, res) => {
    try {
        // Extracting projects array from request body
        const { projects } = req.body;
        
        if (!projects || projects.length === 0) {
            return res.status(400).json({ message: "No projects provided" });
        }

        // Insert bulk data
        const result = await Project.insertMany(projects);
        res.status(201).json({ message: "Projects inserted successfully", data: result });

    } catch (error) {
        console.error("Error inserting projects:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

//get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects from DB
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
