import React, { useState, useEffect } from "react";
import DisscussionForum from "../../../Components/DisscussionForum/DisscussionForum";
import { deleteTaskFromProject, updateTaskInProject } from "../../../utils/api";
import { useAuth } from "../../../Context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Task = ({ tasks = [], openModel, edittask, projectId }) => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [openMenuForTask, setOpenMenuForTask] = useState(null);
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTaskFromProject(projectId, taskId);
      setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      alert("✅ Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("❌ Failed to delete task, please try again.");
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newTaskList = [...taskList];
    const [movedTask] = newTaskList.splice(source.index, 1);

    movedTask.status = destination.droppableId;
    newTaskList.splice(destination.index, 0, movedTask);

    setTaskList([...newTaskList]);

    try {
      await updateTaskInProject(projectId, movedTask._id, { status: movedTask.status });
      alert(`✅ Task moved to "${destination.droppableId}" successfully!`);
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("❌ Failed to update task. Please try again.");
      setTaskList(tasks);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-component w-full lg:h-[335px] flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-nowrap bg-white p-3 gap-5 space-y-10 md:space-y-0 lg:space-y-0">
          {["TODO", "In Progress", "Review", "Done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="tasks md:w-80 w-72 h-[310px] flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
                  <div className="task-category w-full h-5 bg-darkase flex justify-center items-center gap-3 rounded-lg">
                    <p className="w-2 h-2 rounded-full bg-orange text-orange"></p>
                    <p>{status}</p>
                  </div>

                  {taskList
                    .filter((task) => task.status === status)
                    .map((task, idx) => (
                      <Draggable key={task._id} draggableId={task._id} index={idx}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task w-full h-44 flex flex-col bg-white border rounded-lg p-4 gap-5 cursor-pointer mt-2"
                          >
                            <div className="topdiv w-full h-5 flex justify-between items-center">
                              <div className={`priority w-16 h-6 gap-1 flex text-center justify-center rounded-2xl text-sm
                                  ${task?.priority === "High" ? "bg-lightred text-red-600" : ""}
                                  ${task?.priority === "Medium" ? "bg-lightgreen text-green-600" : ""}
                                  ${task?.priority === "Low" ? "bg-lightOrange text-yellow-800" : ""}`}>
                                {task?.priority}
                              </div>
                              <div className="relative">
                              <div
                                className="edit-options-menu text-3xl mt-[-22px] cursor-pointer"
                                onClick={() => setOpenMenuForTask(task._id === openMenuForTask ? null : task._id)}
                              >
                                ...
                              </div>
                              {openMenuForTask === task._id && user?.role === "admin" && (
                                <div className={`absolute top-4 right-0 bg-white shadow-lg p-4 rounded-lg border z-40 flex gap-1 ${user?.role === "admin" ? "w-32" : "w-18"} `}>
                                  <button className="w-10 h-6 bg-lightgreen text-green-700 text-xs p-1" onClick={() => { edittask(task); openModel(); }}>Edit</button>
                                  <button className="w-12 h-6 bg-lightred text-red-700 text-xs p-1" onClick={() => deleteTask(task._id)}>Delete</button>

                                </div>
                              )}
                              </div>
                            </div>
                            <div className="title-description w-full h-12 flex flex-col" onClick={() => setSelectedTask(task)}>
                              <h1 className="text-xl font-base">{task?.title}</h1>
                              <p className="text-sm font-light overflow-hidden">{task?.description}</p>
                            </div>
                            <div className="bottomdiv flex w-full justify-between">
                              <div className="task-members w-20 h-24 relative">
                                {task?.profilePics?.map((pic, id) => (
                                  <div key={id} className={`task-mem-profile w-8 h-8 rounded-full ${id === 0 ? "relative" : "absolute top-0 left-3"}`}>
                                    <img src={pic} alt={`Profile ${id}`} className="rounded-full" />
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
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {selectedTask && <DisscussionForum task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
};

export default Task;
