import React, { useState } from 'react';
import DisscussionForum from '../../../Components/DisscussionForum/DisscussionForum';
import { deleteTaskFromProject } from '../../../utils/api';

const Task = ({ tasks = [], openModel, edittask, projectId }) => {
    console.log("Task received:", tasks);

    const todotask = tasks.filter(task => task.status === 'TODO');
    const inprogresstask = tasks.filter(task => task?.status === 'In Progress');
    const reviewtask = tasks.filter(task => task?.status === 'Review');
    const Donetask = tasks.filter(task => task?.status === 'Done');

    const [selectedTask, setSelectedTask] = useState(null);
    const [openMenuForTask, setOpenMenuForTask] = useState(null); 
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); 
    const [taskList, setTaskList] = useState(tasks); 


    const deleteTask = async (taskId) => {
        const confirmation = window.confirm("Are you sure you want to delete this task?");
        
        if (confirmation) {
            try {
                console.log("Project ID:", projectId);
                console.log("Task ID:", taskId);
                await deleteTaskFromProject(projectId, taskId);
                setTaskList(prevTasks => prevTasks.filter(task => task._id !== taskId));
                alert("Task deleted successfully");
            } catch (error) {
                console.error("Failed to delete task:", error);
                alert("Failed to delete task, please try again.");

            }
        }
    };


    const toggleMenu = (taskId, event) => {
        const { pageX, pageY } = event;

        const offsetX = 10; 
        const offsetY = 10; 

        setMenuPosition({
            x: pageX + offsetX,
            y: pageY + offsetY,
        });

        if (openMenuForTask === taskId) {
            setOpenMenuForTask(null);
        } else {
            setOpenMenuForTask(taskId);
        }
    };

    const openForum = (task) => {
        setSelectedTask(task);
        setOpenMenuForTask(null); 
    };

    const closeForum = () => {
        setSelectedTask(null);
    };

    const openEditForm = (task) => {
        edittask(task); 
        openModel();
    };
    
    

    return (
        <div>
            <div className="task-component w-full lg:h-[335px] flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-nowrap bg-white p-3 gap-5 space-y-10 lg:space-y-0">
                {[{ title: "TODO", tasks: todotask }, { title: "In Progress", tasks: inprogresstask }, { title: "Need Review", tasks: reviewtask }, { title: "Done", tasks: Donetask }].map((group, index) => (
                    <div key={index} className="tasks md:w-80 w-72 h-[310px] flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
                        <div>
                            <div className="task-category w-full h-8 bg-darkase flex justify-center items-center gap-3 rounded-lg">
                                <p className='w-2 h-2 rounded-full bg-orange text-orange'></p>
                                <p>{group.title}</p>
                            </div>
                            {group.tasks?.map((task, idx) => (
                                <div key={idx} className="task w-full h-44 flex flex-col bg-white border rounded-lg p-4 gap-5 cursor-pointer mt-2">
                                    <div className="topdiv w-full h-5 flex flex-row justify-between items-center">
                                        <div className={`priority w-16 h-6 gap-1 flex text-center justify-center rounded-2xl text-sm
                                            ${task?.priority === "High" ? "bg-lightred text-red-600" : ""}
                                            ${task?.priority === "Medium" ? "bg-lightgreen text-green-600" : ""}
                                            ${task?.priority === "Low" ? "bg-lightOrange text-yellow-800" : ""}`}>
                                            {task?.priority}
                                        </div>
                                        <div
                                            className="edit-options-menu text-3xl mt-[-22px] cursor-pointer"
                                            onClick={(e) => toggleMenu(task._id, e)}
                                        >
                                            ...
                                        </div>

                                        {openMenuForTask === task._id && (
                                            <div
                                                className="absolute bg-white shadow-lg p-4 rounded-lg border z-40 w-32 flex flex-col gap-1"
                                                style={{
                                                    top: menuPosition.y + "px",
                                                    left: menuPosition.x + "px",
                                                }}
                                            >
                                                
                                                <div className="edit-delete-buttons flex gap-3 mt-1">
                                                    <button className="w-10 h-6 bg-lightgreen text-green-700 text-xs p-1" onClick={()=> openEditForm(task)}>Edit</button>
                                                    <button className="w-12 h-6 bg-lightred text-red-700 text-xs p-1" onClick={()=> deleteTask(task._id)} >Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="title-description w-full h-12 flex flex-col " onClick={() => openForum(task)}>
                                        <h1 className='text-xl font-base'>{task?.title}</h1>
                                        <p className='text-sm font-light overflow-hidden'>{task?.description}</p>
                                    </div>
                                    <div className="bottomdiv flex w-full justify-between">
                                        <div className="task-members w-20 h-24 relative">
                                            {task?.profilePics?.map((pic, id) => (
                                                <div key={id} className={`task-mem-profile w-8 h-8 rounded-full ${id === 0 ? 'relative' : 'absolute top-0 left-3'}`}>
                                                    <img src={pic} alt={`Profile ${id}`} className='rounded-full' />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="task-details w-28 h-8 flex flex-row gap-3 justify-end">
                                            <div className="members-list flex flex-row gap-1">
                                                <p><i className="ri-attachment-2"></i></p>
                                                <p>{task?.members}</p>
                                            </div>
                                            <div className="members-list flex flex-row gap-1">
                                                <p><i className="ri-chat-1-line"></i></p>
                                                <p>{task?.discussions}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>



            {selectedTask && <DisscussionForum task={selectedTask} onClose={closeForum} />}
        </div>
    );
};

export default Task;
