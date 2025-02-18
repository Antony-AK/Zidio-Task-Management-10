import axios from 'axios';

const BASE_URL = "http://localhost:5001/api/projects";

export const fetchProjects = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fectching projects:", error);
        throw error;
    }
};

export const addTaskToProject = async (projectId, taskData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${projectId}/tasks`, taskData);
        return response.data; // This will return the added task details
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};


export const updateTaskInProject = async (projectId, taskId, taskData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${projectId}/tasks/${taskId}`, taskData);
        return response.data; // This will return the updated task details
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};


export const deleteTaskFromProject = async (projectId, taskId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${projectId}/tasks/${taskId}`);
        return response.data; // This will return the success message from the API
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};
