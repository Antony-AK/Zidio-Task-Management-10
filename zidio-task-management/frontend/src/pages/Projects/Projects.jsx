import React, { useState } from 'react'
import Task from './tasks/Task'
import AddTask from '../../Components/AddTask/AddTask';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../../Context/AuthContext';

const Projects = ({ projects }) => {
  const { user } = useAuth();
  const { _id } = useParams();

  const project = projects.find((proj) => proj._id === _id);

  if (!project) {
    return <p className="text-red-500 text-center">Project not found</p>;
  }

  const [ismodelopen, setModelOpen] = useState(false);
  const [tasks, setTasks] = useState(project.tasks || []);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);



  const toggleModel = () => {
    setModelOpen(!ismodelopen);
  };

  const addNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setModelOpen(false);
  };


  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const formattedDeadline = format(new Date(project?.deadline), 'yyyy-MM-dd');

  const toggleFilterDropdown = () => {
    setShowFilterDropdown((prev) => !prev);
  };

  const applyfilter = (priority) => {
    setFilterPriority(priority);
    setShowFilterDropdown(false);
  };

  const filteredTasks = filterPriority ? tasks.filter((task) => task.priority === filterPriority) : project.tasks;




  if (!projects) {
    return <p className="text-red-500 text-center align-middle">Project not found</p>;
  }

  return (
    <div>

      <div className='w-full h-full flex flex-col p-5 lg:pl-8'>
        <div className="title mb-1" data-aos="fade-right" data-aos-duration="1700">
          <h1 className='text-2xl font-semibold '>{project?.name}</h1>
        </div>

        <div className="project-details flex gap-5 mt-5 lg:w-3/4 w-full overflow-hidden">

          <div className="details-icons flex flex-col space-y-5 text-[#A7A7A7]"  data-aos="fade-left" data-aos-duration="2000">
            <p className='font-textcolorase'><i class="ri-eye-line"></i></p>
            <p><i class="ri-user-follow-line"></i></p>
            <p><i class="ri-calendar-schedule-line"></i></p>
            <p><i class="ri-bookmark-line"></i></p>
          </div>


          <div className="details-left flex flex-col space-y-5 text-[#A7A7A7]"  data-aos="fade-left" data-aos-duration="2000">
            <p>visibility</p>
            <p className='w-[85px]'>Assigned to</p>
            <p>Deadline</p>
            <p>Tags</p>
          </div>

          <div className="details-data flex flex-col space-y-5"  data-aos="fade-left" data-aos-duration="1800">
            <div className="visibility-details w-28 h-6 gap-1 bg-lightred text-red-600 flex text-center justify-center rounded-2xl text-sm">
              <p><i class="ri-lock-2-line"></i></p>
              <p>Private Board</p>
            </div>

            <div className="members-list md:w-full w-20  flex gap-3 overflow-x-scroll scrollbar-hide"  data-aos="fade-left" data-aos-duration="2000">
              {project?.members?.map((member) => (
                <div key={member._id} className="members md:w-28 h-7 gap-2 bg-white flex text-center items-center  rounded-2xl pl-2 pe-2">
                  <div className="member-profile w-6 h-6 rounded-full  ">
                    <img src={member.profile} alt="" className='rounded-full' />
                  </div>
                  <p className='pb-1 text-sm'>{member.name}</p>
                </div>
              ))}



            </div>

            <div className="deadline-date"  data-aos="fade-left" data-aos-duration="1800">
              <p className='text-sm font-medium'>{formattedDeadline}</p>
            </div>

            <div className="tags-list flex gap-5"  data-aos="fade-left" data-aos-duration="1800">
              <div className="tags w-28 h-6 gap-1 bg-blue-200 text-blue-600 flex text-center justify-center rounded-2xl text-sm">
                <p>{project?.status}</p>
              </div>
            </div>
          </div>

        </div>

        <div className="tasks-head-button flex justify-end gap-5 lg:mt-[-33px] mt-7"  data-aos="fade-right" data-aos-duration="1800">
          <div className="task-filter">
            <button className='filter' onClick={toggleFilterDropdown}><p><i class="ri-filter-2-line"></i></p>filter</button>
          </div>
          {user?.role === "manager" &&
            <div className="task-add">
              <button className='add-button' onClick={toggleModel}> + Add Task</button>
            </div>}
        </div>

        {ismodelopen && (
          <div className='model-overlay fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50'>
            <div className='model bg-white md:w-96 w-80 p-6 rounded-lg shadow-lg' data-aos="zoom-in" data-aos-duration="700">
              <h2 className='text-xl font-semibold mb-4'>{taskToEdit ? "Edit Task" : "Add New Task"}</h2>
              <AddTask addNewTask={addNewTask} closeModel={toggleModel} projectId={project?._id} updateTask={updateTask} existingTask={taskToEdit} />
            </div>
          </div>
        )}

        {showFilterDropdown && (
          <div className="absolute right-20 top-80 bg-white shadow-md p-3 rounded-md w-32">
            <button className="block w-full text-left p-2 hover:bg-orange" onClick={() => applyfilter('High')}>
              High
            </button>
            <button className="block w-full text-left p-2 hover:bg-orange" onClick={() => applyfilter('Medium')}>
              Medium
            </button>
            <button className="block w-full text-left p-2 hover:bg-orange" onClick={() => applyfilter('Low')}>
              Low
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={() => applyfilter(null)}>
              Clear Filter
            </button>
          </div>
        )}



        <hr className='my-5'></hr>


        <div className="tasks">
          <Task tasks={filteredTasks} openModel={toggleModel} edittask={setTaskToEdit} projectId={project?._id} />
        </div>

      </div>


    </div>
  )
}

export default Projects
