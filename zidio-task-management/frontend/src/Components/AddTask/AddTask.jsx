import React, { useState } from 'react';
import { addTaskToProject, updateTaskInProject } from '../../utils/api';

const AddTask = ({ addNewTask, closeModel, projectId, existingTask, updateTask }) => {
    const [title, setTitle] = useState(existingTask?.title || '');
    const [description, setDescription] = useState(existingTask?.description || '');
    const [priority, setPriority] = useState(existingTask?.priority || 'Low');
    const [members, setMembers] = useState(existingTask?.members || '');
    const [status, setStatus] = useState(existingTask?.status || 'TODO');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Title and description are required");
            return;
        }

        const taskData = { title, description, priority, members, status };

        try {
            setLoading(true);

            if (existingTask) {
                // Edit Mode: Call update API
                const updatedTask = await updateTaskInProject(projectId, existingTask._id, taskData);
                updateTask(updatedTask);  // Update task in parent component
            } else {
                // Add Mode: Call add API
                const newTask = await addTaskToProject(projectId, taskData);
                addNewTask(newTask);
            }

            setLoading(false);
            closeModel();
            alert(existingTask ? "Task updated successfully" : "Task added successfully");
        } catch (error) {
            setLoading(false);
            alert("Failed to save task, please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Task Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Enter task description"
                    />
                </div>

                <div className="mb-4 flex gap-4">
                    <div>
                        <label className="block text-gray-700">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-2 mt-2 border rounded-lg"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Members</label>
                        <input
                            type="number"
                            value={members}
                            onChange={(e) => setMembers(e.target.value)}
                            className="w-full p-2 mt-2 border rounded-lg"
                            placeholder="Assign members"
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-4">
                    <div>
                        <label className="block text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 mt-2 border rounded-lg"
                        >
                            <option value="TODO">TODO</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={closeModel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="add-button2 h-20"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : existingTask ? "Update Task" : "Add Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;

