import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({ projects, toggleSidebar, isOpen }) => {


  return (
    <div>

      {isOpen && <div className='fixed inset-0 bg-opacity-50 bg-black z-40 lg:hidden' onClick={toggleSidebar}></div>}
      <div className={`side-bar lg:w-1/6 md:w-[30%] w-[63%] border bg-lightase lg:h-[97vh] h-[95%] fixed top-3 left-3 p-4 rounded-l-2xl rounded-r-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0  z-50`}>

      <div className="lg:hidden flex justify-end ">
        <button className='text-2xl bg-transparent' onClick={toggleSidebar}>
        <i className="ri-close-line"></i>
        </button>

      </div>


        <div className="logo">
          <h1 className='text-5xl font-logo'>ZIDIO</h1>
          <h5 className='text-lg font-normal mt-0'>Developers</h5>
        </div>

        <div className="menus-logos flex mt-10 gap-5 md:ml-6 ml-2 text-lg z-50">
          <div className="left-logos space-y-5 ">
            <p className='menuhover'><i class="ri-dashboard-horizontal-line"></i></p>
            <p className='menuhover'><i class="ri-list-check-3"></i></p>
            <div className="logos2  space-y-4">
              <p className='mt-44 menuhover'><i class="ri-calendar-event-line"></i></p>
              <p className='menuhover'><i class="ri-team-line"></i></p>
            </div>
          </div>



          <div className="right-menus flex flex-col text-lg font-main space-y-5 z-50 ">
            <Link to='/dashboard'> <p >Dashboard</p></Link>
            <Link to='/projects/1'> <p>Projects</p></Link>
            <div className="project-list flex flex-col space-y-2 text-base ml-4">
              {projects.map((project) => (
                <Link to={`/projects/${project.id}`} key={project.id}><p className='' >{project.name}</p></Link>
              ))}
            </div>
            <Link to='/calender'> <p >Calender</p></Link>
            <Link to='/members'> <p>Members</p></Link>

          </div>

        </div>

        <div className="logout flex flex-row md:mt-36 mt-16 gap-4 md:ml-6 ml-2 text-lg font-main menuhover">
          <p className=''><i class="ri-logout-circle-line "></i></p>
          <a href="#login" className=''>Logout</a>

        </div>




      </div>

    </div>
  )
}

export default Sidebar
