const express = require("express");
const Project = require("../models/Project");
const router = express.Router();
const mongoose = require('mongoose'); 
const Summary = require('../models/SummaryModel');


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
            _id: new mongoose.Types.ObjectId(),
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

        const task = project.tasks.find(t => t._id.toString() === taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (req.body.status && !["TODO", "In Progress", "Review", "Done"].includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        if (req.body.priority && !["High", "Medium", "Low"].includes(req.body.priority)) {
            return res.status(400).json({ message: "Invalid priority value" });
        }

        Object.assign(task, req.body);

        // If the status is updated to "Done", set the completedAt timestamp
        if (req.body.status === "Done" && !task.completedAt) {
            task.completedAt = new Date();
        }

        project.markModified("tasks");
        await project.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.delete("/:projectId/tasks/:taskId", async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        
        console.log(`Received request to delete task with ID: ${taskId} from project with ID: ${projectId}`);

        const project = await Project.findById(projectId);
        if (!project) {
            console.log(`Project with ID ${projectId} not found in database.`);
            return res.status(404).json({ message: "Project not found" });
        }
        console.log(`Project with ID ${projectId} found. Proceeding with task deletion.`);

        console.log("Current tasks in the project:", project.tasks);

        const taskObjectId = new mongoose.Types.ObjectId(taskId);

        const taskIndex = project.tasks.findIndex(t => t._id.toString() === taskObjectId.toString());

        if (taskIndex === -1) {
            console.log(`Task with ID ${taskId} not found in project.`);
            return res.status(404).json({ message: "Task not found" });
        }
        console.log(`Task with ID ${taskId} found. Proceeding to delete.`);

        console.log("Task to be deleted:", project.tasks[taskIndex]);

        project.tasks.splice(taskIndex, 1);
        console.log("Task successfully removed. Updated tasks:", project.tasks);

        project.markModified("tasks");

        console.log("Saving the updated project with removed task:", project);

        await project.save();
        console.log("Project saved successfully after task deletion.");

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error in deleting task:", error);
        res.status(500).json({ message: error.message });
    }
});



router.post("/bulk-insert", async (req, res) => {
    try {
        const { projects } = req.body;
        
        if (!projects || projects.length === 0) {
            return res.status(400).json({ message: "No projects provided" });
        }

        const result = await Project.insertMany(projects);
        res.status(201).json({ message: "Projects inserted successfully", data: result });

    } catch (error) {
        console.error("Error inserting projects:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const projects = await Project.find(); 
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.get("/summary", async (req, res) => {
    try {
        const projects = await Project.find({}, "status"); 

        const summary = {
            TotalProjects: projects.length,
            PendingProjects: projects.filter(p => p.status === "Pending").length,
            RunningProjects: projects.filter(p => p.status === "In Progress").length,
            EndedProjects: projects.filter(p => p.status === "Done").length,
        };

        res.status(200).json(summary);
    } catch (error) {
        console.error("Error fetching project summary:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:projectId/tasks-summary", async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Initialize counts
        const taskCounts = {
            TODO: 0,
            "In Progress": 0,
            Review: 0,
            Done: 0,
        };

        // Count the number of tasks for each status
        project.tasks.forEach(task => {
            if (taskCounts.hasOwnProperty(task.status)) {
                taskCounts[task.status]++;
            }
        });

        res.status(200).json({
            projectId: project._id,
            projectName: project.name,
            taskSummary: taskCounts,
        });
    } catch (error) {
        console.error("Error fetching task summary:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:projectId/completed-tasks", async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const completedTasks = project.tasks
            .filter(task => task.status === "Done" && task.completedAt)
            .map(task => ({
                title: task.title,
                completedAt: task.completedAt
            }));

        res.status(200).json(completedTasks);
    } catch (error) {
        console.error("Error fetching completed tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new project
router.post("/add-project", async (req, res) => {
    try {
        const { name, description, manager, deadline } = req.body;

        // Validate required fields
        if (!name || !description || !manager || !deadline) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProject = new Project({
            name,
            description,
            manager,   // ✅ Assign project manager
            deadline,
            status: "Pending",
            tasks: [],
            members: [],
        });

        await newProject.save();
        res.status(201).json({ message: "Project added successfully", project: newProject });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


module.exports = router; 