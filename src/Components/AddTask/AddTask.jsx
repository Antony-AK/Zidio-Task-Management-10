import React, { useState } from 'react'

const AddTask = ({ addNewTask, closeModel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [assignedTo, setAssignedTo] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && description) {
            const newTask = {
                id: Math.random(),
                title,
                description,
                priority,
                assignedTo,
                dueDate,
                status,
            };
            addNewTask(newTask);

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
                        <label className="block text-gray-700">Assigned To</label>
                        <input
                            type="text"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="w-full p-2 mt-2 border rounded-lg"
                            placeholder="Assigned member"
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-4">
                    <div>
                        <label className="block text-gray-700">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 mt-2 border rounded-lg"
                        />
                    </div>
                    <div>
                    <label className="block text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 mt-2 border rounded-lg"
                        >
                            <option value="TODO">TODO</option>
                            <option value="In_Progress">In Progress</option>
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
                    >
                        Add Task
                    </button>
                </div>
            </form>

        </div>
    )
}

export default AddTask
