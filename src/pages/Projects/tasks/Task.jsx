import React from 'react';
import DisscussionForum from '../../../Components/DisscussionForum/DisscussionForum';
import { useState } from 'react';

const Task = ({ tasks }) => {
    console.log("Task received:", tasks.status);

    const todotask = tasks.filter(task => task.status === 'TODO');
    const inprogresstask = tasks.filter(task => task.status === 'In_Progress');
    const reviewtask = tasks.filter(task => task.status === 'Review');
    const Donetask = tasks.filter(task => task.status === 'Done');

    const [selectedTask, setSelectedTask] = useState(null);

    const openForum = (task) => {
        setSelectedTask(task);
    };

    const closeForum = () => {
        setSelectedTask(null);
    };


    return (
        <div>
            <div className="task-component w-full h-[335px] flex bg-white p-3 gap-5">


                <div className="tasks w-80 h-[310px] flex flex-col gap-5 overflow-y-scroll scrollbar-hide ">
                    <div className="task-category w-[278px] h-8 bg-darkase flex justify-center items-center gap-3 rounded-lg fixed overflow-hidden ">
                        <p className='w-2 h-2 rounded-full bg-orange text-orange'></p>
                        <p>TODO</p>
                    </div>

                    <div className='mt-8'>
                        {todotask.map((task, index) => (
                            <div key={index} className="task w-full h-44 flex flex-col bg-white border rounder-lg p-4 gap-2 rounded-lg cursor-pointer mt-2" onClick={() => openForum(task)}>
                                <div className="topdiv w-full h-5 flex flex-row justify-between items-center">
                                    <div className={`priority w-16 h-6 gap-1 flex text-center justify-center rounded-2xl text-sm
                                         ${task.priority === "High" ? "bg-lightred text-red-600" : ""}
                                         ${task.priority === "Medium" ? "bg-lightgreen text-green-600" : ""}
                                         ${task.priority === "Low" ? "bg-lightOrange text-yellow-800" : ""}
                            `}>
                                        {task.priority}
                                    </div>
                                    <div className="edit-options-menu text-3xl mt-[-22px] cursor-pointer">
                                        ...
                                    </div>
                                </div>

                                <div className="title-description w-full h-12 flex flex-col ">
                                    <h1 className='text-xl font-base'>{task.title}</h1>
                                    <p className='text-sm font-light overflow-hidden'>{task.description}</p>
                                </div>

                                <div className="bottomdiv flex w-full justify-between ">
                                    <div className="task-members w-20 h-24 relative">
                                        {task.profilePics.map((pic, index) => (
                                            <div key={index} className={`task-mem-profile w-8 h-8 rounded-full ${index === 0 ? 'relative' : 'absolute top-0 left-3'}`}>
                                                <img src={pic} alt={`Profile ${index}`} className='rounded-full' />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="task-details w-28 h-8 flex flex-row gap-3 justify-end">
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-attachment-2"></i></p>
                                            <p>{task.members}</p>
                                        </div>
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-chat-1-line"></i></p>
                                            <p>{task.discussions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tasks w-80 h-[310px] flex flex-col gap-5 overflow-y-scroll scrollbar-hide ">
                    <div className="task-category w-[278px] h-8 bg-darkase flex justify-center items-center gap-3 rounded-lg fixed overflow-hidden " >
                        <p className='w-2 h-2 rounded-full bg-orange text-orange'></p>
                        <p>In Progress</p>
                    </div>

                    <div className='mt-8'>
                        {inprogresstask.map((task, index) => (
                            <div key={index} className="task w-full h-44 flex flex-col bg-white border rounder-lg p-4 gap-2 rounded-lg cursor-pointer mt-2" onClick={() => openForum(task)}>
                                <div className="topdiv w-full h-5 flex flex-row justify-between items-center">
                                    <div className={`priority w-16 h-6 gap-1 flex text-center justify-center rounded-2xl text-sm
                                        ${task.priority === "High" ? "bg-lightred text-red-600" : ""}
                                        ${task.priority === "Medium" ? "bg-lightgreen text-green-600" : ""}
                                        ${task.priority === "Low" ? "bg-lightOrange text-yellow-800" : ""}`}>
                                        {task.priority}
                                    </div>
                                    <div className="edit-options-menu text-3xl mt-[-22px] cursor-pointer">
                                        ...
                                    </div>
                                </div>

                                <div className="title-description w-full h-12 flex flex-col ">
                                    <h1 className='text-xl font-base'>{task.title}</h1>
                                    <p className='text-sm font-light overflow-hidden'>{task.description}</p>
                                </div>

                                <div className="bottomdiv flex w-full justify-between ">
                                    <div className="task-members w-20 h-24 relative">
                                        {task.profilePics.map((pic, index) => (
                                            <div key={index} className={`task-mem-profile w-8 h-8 rounded-full ${index === 0 ? 'relative' : 'absolute top-0 left-3'}`}>
                                                <img src={pic} alt={`Profile ${index}`} className='rounded-full' />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="task-details w-28 h-8 flex flex-row gap-3 justify-end">
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-attachment-2"></i></p>
                                            <p>{task.members}</p>
                                        </div>
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-chat-1-line"></i></p>
                                            <p>{task.discussions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tasks w-80 h-[310px] flex flex-col gap-5 overflow-y-scroll scrollbar-hide ">
                    <div className="task-category w-[278px] h-8 bg-darkase flex justify-center items-center gap-3 rounded-lg fixed overflow-hidden " >
                        <p className='w-2 h-2 rounded-full bg-orange text-orange'></p>
                        <p>Need Review</p>
                    </div>

                    <div className='mt-8'>
                        {reviewtask.map((task, index) => (
                            <div key={index} className="task w-full h-44 flex flex-col bg-white border rounder-lg p-4 gap-2 rounded-lg cursor-pointer mt-2" onClick={() => openForum(task)}>
                                <div className="topdiv w-full h-5 flex flex-row justify-between items-center">
                                    <div className={`priority w-16 h-6 gap-1  flex text-center justify-center rounded-2xl text-sm
                                        ${task.priority === "High" ? "bg-lightred text-red-600" : ""}
                                        ${task.priority === "Medium" ? "bg-lightgreen text-green-600" : ""}
                                        ${task.priority === "Low" ? "bg-lightOrange text-yellow-800" : ""}`}>
                                        {task.priority}
                                    </div>
                                    <div className="edit-options-menu text-3xl mt-[-22px] cursor-pointer">
                                        ...
                                    </div>
                                </div>

                                <div className="title-description w-full h-12 flex flex-col ">
                                    <h1 className='text-xl font-base'>{task.title}</h1>
                                    <p className='text-sm font-light overflow-hidden'>{task.description}</p>
                                </div>

                                <div className="bottomdiv flex w-full justify-between ">
                                    <div className="task-members w-20 h-24 relative">
                                        {task.profilePics.map((pic, index) => (
                                            <div key={index} className={`task-mem-profile w-8 h-8 rounded-full ${index === 0 ? 'relative' : 'absolute top-0 left-3'}`}>
                                                <img src={pic} alt={`Profile ${index}`} className='rounded-full' />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="task-details w-28 h-8 flex flex-row gap-3 justify-end">
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-attachment-2"></i></p>
                                            <p>{task.members}</p>
                                        </div>
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-chat-1-line"></i></p>
                                            <p>{task.discussions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tasks w-80 h-[310px] flex flex-col gap-5 overflow-y-scroll scrollbar-hide ">
                    <div className="task-category w-[278px] h-8 bg-darkase flex justify-center items-center gap-3 rounded-lg fixed overflow-hidden " >
                        <p className='w-2 h-2 rounded-full bg-orange text-orange'></p>
                        <p>Done</p>
                    </div>

                    <div className='mt-8'>
                        {Donetask.map((task, index) => (
                            <div key={index} className="task w-full h-44 flex flex-col bg-white border rounder-lg p-4 gap-2 rounded-lg cursor-pointer mt-2" onClick={() => openForum(task)}>
                                <div className="topdiv w-full h-5 flex flex-row justify-between items-center">
                                    <div className={`priority w-16 h-6 gap-1 flex text-center justify-center rounded-2xl text-sm
                                        ${task.priority === "High" ? "bg-lightred text-red-600" : ""}
                                        ${task.priority === "Medium" ? "bg-lightgreen text-green-600" : ""}
                                        ${task.priority === "Low" ? "bg-lightOrange text-yellow-800" : ""}`}>
                                        {task.priority}
                                    </div>
                                    <div className="edit-options-menu text-3xl mt-[-22px] cursor-pointer">
                                        ...
                                    </div>
                                </div>

                                <div className="title-description w-full h-12 flex flex-col ">
                                    <h1 className='text-xl font-base'>{task.title}</h1>
                                    <p className='text-sm font-light overflow-hidden'>{task.description}</p>
                                </div>

                                <div className="bottomdiv flex w-full justify-between ">
                                    <div className="task-members w-20 h-24 relative">
                                        {task.profilePics.map((pic, index) => (
                                            <div key={index} className={`task-mem-profile w-8 h-8 rounded-full ${index === 0 ? 'relative' : 'absolute top-0 left-3'}`}>
                                                <img src={pic} alt={`Profile ${index}`} className='rounded-full' />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="task-details w-28 h-8 flex flex-row gap-3 justify-end">
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-attachment-2"></i></p>
                                            <p>{task.members}</p>
                                        </div>
                                        <div className="members-list flex flex-row gap-1">
                                            <p><i className="ri-chat-1-line"></i></p>
                                            <p>{task.discussions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
            {
                selectedTask && <DisscussionForum task={openForum} onClose={closeForum} />
            }
        </div>
    );
};

export default Task;
