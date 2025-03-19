import React, {useState} from 'react'
import TriangleChart from './TriangleChart'
import { format } from 'date-fns';
import { useAuth } from '../../Context/AuthContext';
import AddProjectForm from '../../Components/AddProjectForm/AddProjectForm';
import { addNewProject } from '../../utils/api';

const Dashboard = ({ summary, projects }) => {
  const { user } =  useAuth();
    const [ismodelopen, setModelOpen] = useState(false);

    const toggleModel = () => {
      setModelOpen(!ismodelopen);
    };
  


  const status_data = [
    { name: "Pending", value: summary?.PendingProjects || 0, fill: "#FF0000" },
    { name: "In Progress", value: summary?.RunningProjects || 0, fill: "#ffa500" },
    { name: "Completed", value: summary?.EndedProjects || 0, fill: "#32cd32" }
  ];

  const formattedDeadline = format(new Date(projects[0]?.deadline), 'yyyy-MM-dd');


  const handleAddNewProject = async (projectData) => {
    const res = await addNewProject(projectData);
    console.log("Project Added ✅", res);
  };
  
  


  return (
    <div>
      <div className="dashboard w-full h-full flex flex-col p-5 lg:pl-8">
        <div className=" title mb-1" data-aos="fade-right" data-aos-duration="1700">
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
          <p className='text-sm font-light'>Centralized overview of key insights.</p>
        </div>
        {user?.role === "admin" &&
        <div className="project-add flex justify-end items-end mt-5 mx-auto md:me-5 md:-mt-10">
              <button className='add-button-project bg-orange px-2 py-1  md:px-2 md:py-2 rounded-lg hover:scale-95 ' onClick={toggleModel} > + Add Project</button>
            </div>
        }

          {ismodelopen && (
                  <div className='model-overlay fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50'>
                      <AddProjectForm closeModel={toggleModel} addNewProject={handleAddNewProject} />
                    </div>
                 
                )}


        <div className="projects-details-dashboard lg:w-full md:w-[600px]  md:flex md:flex-wrap lg:flex lg:flex-nowrap justify-center items-center lg:h-48 mx-auto md:h-[410px] sm:h-[740px] mt-10 lg:p-2 gap-5 space-y-5 md:space-y-0 lg:space-y-0">
          {Object.entries(summary).map(([key, value], index) => (
            <div key={index} className="showcase-data lg:w-72 h-40 bg-white flex flex-col rounded-2xl mx-auto px-6 py-4 transform ease-linear duration-300 hover:bg-orange shadow-md " data-aos="flip-right" data-aos-duration="1800">
              <div className="topdiv-data flex justify-between">
                <div className="data-title">
                  <p className='font-semibold'>{key}</p>
                </div>
                <div className="sendbutton w-10 h-10 rounded-full bg-white border border-black flex justify-center items-center">
                  <p className='text-center text-lg'><i className="ri-arrow-right-up-line"></i></p>
                </div>
              </div>

              <div className="center-pro-connt">
                <p className='text-5xl ml-5'>{value}</p>
              </div>

              <div className="bottom-data-div flex mt-4 gap-1">
                <div className="small-design-data w-5 h-4 bg-white border border-gray-400 text-xs text-center rounded-md mt-0.5 hover:border-none">^5</div>
                <p className='text-sm font-normal'>Increased from last month</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-projects-data lg:flex justify-between w-full h-[260px] mt-5 px-3 ">
          <div className="dash-projects-list lg:w-[600px] w-full h-full bg-white rounded-2xl border md:p-6 p-4 overflow-y-scroll scrollbar-hide" data-aos="flip-up" data-aos-duration="1800">
            <p className='text-lg font-medium '>Projects</p>
            {projects.map((project, index) => (
              <div key={index} className="project-data-status flex justify-between lg:mx-16 mt-3 mx-auto">
                <div className="project-data ">
                  <p className='lg:text-lg '>{project.name}</p>
                  <p className='font-light text-sm  '>Due date {formattedDeadline}</p>
                </div>
                <div className={`status md:w-24 w-16 h-6 mt-3 rounded-xl md:text-sm text-xs text-center flex justify-center items-center
                  ${project.status === "Pending" ? "bg-lightred text-red-600" : ""}
                  ${project.status === "Completed" ? "bg-lightgreen text-green-600" : ""}
                  ${project.status === "In Progress" ? "bg-lightOrange text-yellow-800" : ""}`}>
                  {project.status}
                </div>
              </div>
            ))}
          </div>

          <div className="graph-data mx-auto" data-aos="flip-up" data-aos-duration="1800">
            <TriangleChart data={status_data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
