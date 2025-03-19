import React, { useState } from 'react';

const AddProjectForm = ({ closeModel, addNewProject }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewProject(formData);  // ✅ Call the function passed from Dashboard
      closeModel(); 
      alert("Project Added Successfully");               // ✅ Close the modal after successful submission
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-[400px] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className="mb-4">
          <label className="block mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter project name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter project description"
            required
          ></textarea>
        </div>

        {/* Manager */}
        <div className="mb-4">
          <label className="block mb-1">Project Manager</label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter manager's name"
            required
          />
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label className="block mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Action Buttons */}
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
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
