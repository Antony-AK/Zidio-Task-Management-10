import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';


const Sidebar = ({ projects, toggleSidebar, isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();


  return (
    <div>

      {isOpen && <div className='fixed inset-0 bg-opacity-50 bg-black z-40 lg:hidden' onClick={toggleSidebar}></div>}
      <div className={`side-bar lg:w-1/6 md:w-[30%] w-[63%] border bg-lightase lg:h-[97vh] h-[95%] fixed top-3 left-3 p-4 rounded-l-2xl rounded-r-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0  z-50`}>

        <div className="lg:hidden flex justify-end ">
          <button className='text-2xl bg-transparent' onClick={toggleSidebar}>
            <i className="ri-close-line"></i>
          </button>

        </div>


        <div className="logo" data-aos="fade-right" data-aos-duration="1200">
          <h1 className='text-5xl font-logo'>ZIDIO</h1>
          <h5 className='text-lg font-normal mt-0'>Developers</h5>
        </div>

        {user?.role === "admin" ? (
            <div className=" menus-logos flex mt-10 gap-5 md:ml-6 ml-2 text-lg z-50">
              <div className="left-logos space-y-5 " data-aos="fade-right" data-aos-duration="1600">
                <p className={location.pathname === "/" ? "text-orange" : ""}><i class="ri-dashboard-horizontal-line"></i></p>
                <p className='menuhover'><i class="ri-list-check-3"></i></p>
                <div className=" logos2  space-y-4 ">
                  <p className={`${location.pathname === "/calender" ? "text-orange" : ""} mt-[175px] md:mt-[199px] lg:mt-[175px]  `} ><i class="ri-calendar-event-line"></i></p>
                  <p className={location.pathname === "/members" ? "text-orange" : ""} ><i class="ri-team-line"></i></p>
                </div>
              </div>
            
            <div className="right-menus flex flex-col text-lg font-main space-y-5 z-50 " data-aos="fade-right" data-aos-duration="1500">
              <Link to='/'> <p className={location.pathname === "/" ? "text-orange" : ""} >Dashboard</p></Link>
              <Link to='/projectdetail'> <p className={location.pathname === "/projectdetail" ? "text-orange" : ""} >Projects</p></Link>
              <div className="project-list flex flex-col space-y-2 text-base ml-4">
                {projects?.length > 0 ? (
                  projects.map((project) => (
                    <Link to={`/projectdetail/${project._id}`} key={project._id}><p className={location.pathname === `/projectdetail/${project._id}` ? "text-orange" : ""}>{project.name}</p></Link>
                  ))) : (
                  <p>No Projects</p>
                )}
              </div>
              <Link to='/calender'> <p className={location.pathname === "/calender" ? "text-orange" : ""}  >Calender</p></Link>
              <Link to='/members'> <p className={location.pathname === "/members" ? "text-orange" : ""}  >Members</p></Link>
            </div>
          </div>
        ) : (
          <div className="menus-logos flex mt-10 gap-5 md:ml-6 ml-2 text-lg z-50">
            <div className="left-logos space-y-5 " data-aos="fade-right" data-aos-duration="1600">
            <p className={location.pathname === "/" ? "text-orange" : ""}><i class="ri-dashboard-horizontal-line"></i></p>
              <p className='menuhover'><i class="ri-list-check-3"></i></p>
              <div className=" logos2  space-y-4 ">
                <p className={`${ location.pathname === "/calender" ? "text-orange" : ""}   mt-[175px] md:mt-[199px] lg:mt-[175px] `} ><i class="ri-calendar-event-line"></i></p>
              </div>
            </div>



            <div className="right-menus flex flex-col text-lg font-main space-y-5 z-50 " data-aos="fade-right" data-aos-duration="1500">
            <Link to='/'> <p className={location.pathname === "/" ? "text-orange" : ""} >Dashboard</p></Link>
              <Link to='/projects'> <p className='pointer-events-none' >Projects</p></Link>
              <div className="project-list flex flex-col space-y-2 text-base ml-4">
                {projects?.length > 0 ? (
                  projects.map((project) => (
                    <Link to={`/projects/${project._id}`} key={project._id}><p className={location.pathname === `/projects/${project._id}` ? "text-orange" : ""}>{project.name}</p></Link>
                  ))) : (
                  <p>No Projects</p>
                )}
              </div>
              <Link to='/calender'> <p className={location.pathname === "/calender" ? "text-orange" : ""}  >Calender</p></Link>
            </div>

          </div>
        )}

        <div className="logout flex flex-row md:mt-36 mt-16 gap-4 md:ml-6 ml-2 text-lg font-main menuhover" >
          <p className=''><i class="ri-logout-circle-line "></i></p>
          <Link to='/login' ><a href="#login" className=''>Logout</a></Link>

        </div>




      </div>

    </div>
  )
}

export default Sidebar
