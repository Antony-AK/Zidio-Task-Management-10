import React from 'react'
import { images } from '../../assets/data'

const Navbar = () => {
  return (
    <div>
      <nav className='w-[calc(100%-18.22%)] bg-lightase h-14  flex  rounded-l-2xl rounded-r-2xl  justify-between items-center ml-[18.22%]'>

        <div className='serach-bar w-80 bg-white h-8 m-5 rounded-l-2xl rounded-r-2xl ml-10 p-1 relative'>
          <input type="text" className='w-full h-full p-2 outline-none relative' />
          <p className='absolute top-0 right-5 text-lg '><i class="ri-search-line"></i></p>
        </div>

        <div className="right w-80 flex justify-center items-center p-1 h-15 ">
          <div className="notification-div rounded-full w-10 h-10 bg-white flex justify-center items-center ml-8">
            <p className='text-lg'><i class="ri-notification-4-line"></i></p>
          </div>
          <div className="Profile flex w-52 p-2 gap-4 justify-center items-center mr-5">
            <div className="notification-div rounded-full w-10 h-10 flex justify-center items-center">
              <img src={images.p1} alt=""  className='rounded-full' />
            </div>
            <p className='font-base font-medium  text-lg'>Hanna</p>
          </div>

        </div>

      </nav>


    </div>
  )
}

export default Navbar
