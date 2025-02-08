import React from 'react'
import TriangleChart from './TriangleChart'

const Dashboard = ({ summary, projects }) => {
  console.log(summary);

  const status_data = [
    { name: "Pending", value: 40, fill: "#FF0000" },
    { name: "In Progress", value: 30, fill: "#ffa500" },
    { name: "Completed", value: 20, fill: "#32cd32" }
  ]

  return (
    <div>
      <div className="dashboard w-full h-full flex flex-col p-5 pl-8">
        <div className="title mb-1">
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
          <p className='text-sm font-light'>Centralized overview of key insights.</p>
        </div>

        <div className="projects-details-dashboard w-full flex h-48 mt-10 p-2 gap-5">
          {summary.title.map((title, index) => (
            <div key={index} className="showcase-data w-72 h-40 bg-white flex flex-col rounded-2xl px-6 py-4 transform ease-linear duration-300 hover:bg-orange shadow-md">
              <div className="topdiv-data flex justify-between">
                <div className="data-title">
                  <p className='font-semibold'>{title}</p>
                </div>
                <div className="sendbutton w-10 h-10 rounded-full bg-white border border-black flex justify-center items-center">
                  <p className='text-center text-lg'><i className="ri-arrow-right-up-line"></i></p>
                </div>
              </div>

              <div className="center-pro-connt">
                <p className='text-5xl ml-5'>{Object.values(summary.counts[index])[0]}</p>
              </div>

              <div className="bottom-data-div flex mt-4 gap-1">
                <div className="small-design-data w-5 h-4 bg-white border border-gray-400 text-xs text-center rounded-md mt-0.5 hover:border-none">^5</div>
                <p className='text-sm font-normal'>Increased from last month</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-projects-data flex justify-between w-full h-[260px] mt-5 px-3">
          <div className="dash-projects-list w-[650px] h-full bg-white rounded-2xl border p-5 overflow-y-scroll scrollbar-hide">
            <p className='text-lg font-medium'>Projects</p>
            {projects.map((project, index) => (
              <div key={index} className="project-data-status flex justify-between mx-16 mt-3">
                <div className="project-data">
                  <p className='text-lg'>{project.name}</p>
                  <p className='font-light'>Due date {project.deadline}</p>
                </div>
                <div className={`status w-24 h-6 mt-3 rounded-xl text-sm text-center
                  ${project.status === "Pending" ? "bg-lightred text-red-600" : ""}
                  ${project.status === "Completed" ? "bg-lightgreen text-green-600" : ""}
                  ${project.status === "In Progress" ? "bg-lightOrange text-yellow-800" : ""}`}>
                  {project.status}
                </div>
              </div>
            ))}
          </div>

          <div className="graph-data">
            <TriangleChart data={status_data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
