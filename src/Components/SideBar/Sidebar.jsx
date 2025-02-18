import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({ projects }) => {


  return (
    <div>
      <div className="side-bar w-1/6 bg-lightase h-[97vh] fixed top-3 left-3 p-4 rounded-l-2xl rounded-r-2xl ">
        <div className="logo">
          <h1 className='text-5xl font-logo'>ZIDIO</h1>
          <h5 className='text-lg font-normal mt-0'>Developers</h5>
        </div>

        <div className="menus-logos flex mt-10 gap-5 ml-6 text-lg">
          <div className="left-logos space-y-5 ">
            <p className='menuhover'><i class="ri-dashboard-horizontal-line"></i></p>
            <p className='menuhover'><i class="ri-list-check-3"></i></p>
            <div className="logos2  space-y-4">
              <p className='mt-44 menuhover'><i class="ri-calendar-event-line"></i></p>
              <p className='menuhover'><i class="ri-team-line"></i></p>
            </div>
          </div>



          <div className="right-menus flex flex-col text-lg font-main space-y-5 ">
            <Link to='/dashboard'> <a href="#dasboard">Dashboard</a></Link>
            <Link to='/projects'> <a href="#projects ">Projects</a></Link>
            <div className="project-list flex flex-col space-y-2 text-base ml-5">
              {projects.map((project) => (
                <Link to={`/projects/${project.id}`} key={project.id}><a href="#website" className='' >{project.name}</a></Link>
              ))}
            </div>
            <Link to='/calender'> <a href="#calender">Calender</a></Link>
            <Link to='/members'> <a href="#members">Members</a></Link>

          </div>

        </div>

        <div className="logout flex flex-row mt-36 gap-4 ml-8 text-lg font-main menuhover">
          <p className=''><i class="ri-logout-circle-line "></i></p>
          <Link to='/logout'> <a href="#logout" className=''>Logout</a></Link>

        </div>




      </div>

    </div>
  )
}

export default Sidebar
