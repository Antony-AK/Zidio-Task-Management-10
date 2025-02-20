import React from 'react'
import { images } from '../../assets/data'

const Navbar = ({toggleSidebar, user}) => {
  return (
    <div>
      <nav className='lg:w-[calc(100%-18.22%)] w-[99%] ml-3 border bg-lightase h-14  flex  rounded-l-2xl rounded-r-2xl  justify-between items-center lg:ml-[18.22%] '>
        <div className="burgermenu lg:hidden ml-6">
          <button className='text-3xl text-gray-500' onClick={toggleSidebar}>
          <i className="ri-menu-line"></i>
          </button>
          
        </div>

        <div className='serach-bar md:w-80 bg-white h-9 m-5 rounded-l-2xl rounded-r-2xl md:ml-10 p-1 relative ' data-aos="fade" data-aos-duration="1000" >
          <input type="text" className='md:w-full w-28 h-full p-2 outline-none relative' />
          <p className='absolute top-1 right-5 text-lg '><i class="ri-search-line"></i></p>
        </div>

        <div className="right md:w-80 w-40 flex justify-center items-center p-1 h-12 -ml-18" data-aos="fade" data-aos-duration="1000">
          <div className="notification-div rounded-full w-28 h-10 md:w-10 md:h-10 bg-white flex justify-center items-center md:ml-8">
            <p className='text-lg'><i class="ri-notification-4-line"></i></p>
          </div>
          <div className="Profile flex w-52 p-2 gap-4 justify-center items-center mr-5">
            <div className="notification-div rounded-full w-10 h-10 flex justify-center items-center">
              <img src={images.p7} alt=""  className='rounded-full' />
            </div>
            <p className='font-base font-medium  sr-only sm:not-sr-only text-lg'>{user?.isAuthenticated ? user?.name : "Guest"}</p>
          </div>

        </div>

      </nav>


    </div>
  )
}

export default Navbar
