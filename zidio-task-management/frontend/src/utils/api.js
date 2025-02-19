import axios from 'axios';

const BASE_URL = "http://localhost:5001/api/projects";
const EVENTS_API_URL = "http://localhost:5001/api/events";


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
        return response.data; 
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};


export const updateTaskInProject = async (projectId, taskId, taskData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${projectId}/tasks/${taskId}`, taskData);
        return response.data; 
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};


export const deleteTaskFromProject = async (projectId, taskId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${projectId}/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

export const fetchSummary = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/summary`);
        return response.data;
    } catch (error) {
        console.error("Error fetching summary:", error);
        return null;
    }
};

//calender events
export const fetchEvents = async () => {
    try {
        const response = await axios.get(EVENTS_API_URL);
        return response.data; 
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

export const addEvent = async (eventData) => {
    try {
        const response = await axios.post(`${EVENTS_API_URL}/addevent`, eventData);
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};

export const updateEvent = async (eventId, updatedEventData) => {
    try {
      const response = await axios.put(`${EVENTS_API_URL}/${eventId}`, updatedEventData);
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };
  
  export const deleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(`${EVENTS_API_URL}/${eventId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };