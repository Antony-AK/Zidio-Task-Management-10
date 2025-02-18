import React, { useState } from 'react'
import { images } from '../../assets/data';
import AddMember from './AddMember';

const membersData = [
  {
    name: "Alice",
    email: "alice@example.com",
    position: "Project Manager",
    DOB: "1990-05-12",
    projects: 3,
    profile: images.p7
  },
  {
    name: "David",
    email: "david@example.com",
    position: "Backend Developer",
    DOB: "1992-08-25",
    projects: 3,
    profile: images.p5
  },
  {
    name: "Charlie",
    email: "charlie@example.com",
    position: "Frontend Developer",
    DOB: "1995-11-30",
    projects: 1,
    profile: images.p6
  },
  {
    name: "Eve",
    email: "eve@example.com",
    position: "UI/UX Designer",
    DOB: "1993-02-14",
    projects: 2,
    profile: images.p1
  },
  {
    name: "Bob",
    email: "bob@example.com",
    position: "Mobile Developer",
    DOB: "1994-07-09",
    projects: 1,
    profile: images.p3
  },
  {
    name: "Frank",
    email: "frank@example.com",
    position: "QA Engineer",
    DOB: "1991-12-21",
    projects: 3,
    profile: images.p4
  }
];

const Members = () => {
  const [ismodelopen, setModelOpen] = useState(false);

  const openmodel = () => {
    setModelOpen(!ismodelopen);
  };

  const addNewMem = (newMem) => {
    MemberInfo.push(newMem);
    setModelOpen(false);
  }

  const MemberInfo = () => {
    const Infotitle = ["Profile", "Email", "Name", "Position", "DOB", "Projects" ];
    return Infotitle.map((title, index) => (
      <div key={index} className="text-center font-base font-semibold p-2 bg-orange text-black">{title}</div>
    ));
  };

  return (
    <div>
      <div className="members w-full h-full flex flex-col gap-5 p-5">
        <div className="title ml-4">
          <h1 className='text-2xl font-semibold '>Members</h1>
        </div>

        <div className="tasks-head-button flex justify-end gap-5 mt-7 md:mt-1 md:mr-28 ">
          <div className="task-filter">
            <button className='filter'><p><i class="ri-filter-2-line"></i></p>filter</button>
          </div>

          <div className="task-add">
            <button className='add-button' onClick={openmodel}> + Member</button>
          </div>
        </div>

        <div className="members-info w-[95%] mx-auto mt-5 overflow-x-auto ">
          <div className="grid grid-cols-6 h-12 border-t border-l min-w-[800px] md:min-w-[600px]">{MemberInfo()}</div>
          <div className='w-full h-[370px] overflow-y-scroll scrollbar-hide min-w-[800px] md:min-w-[600px]'>
            {membersData.map((info, index)=> (
              <div key={index} className="mem-info space-x-3 mt-5 font-main grid grid-cols-6  bg-white rounded-lg border p-2 ease-linear duration-100 hover:border-orange">
                <div className="profilepics rounded-full w-36">
                  <img src={info.profile} className='w-10 h-10 mx-auto rounded-full' alt="" />
                </div>
                <div className="email w-36 text-center pt-2">{info.email}</div>
                <div className="name w-40 text-center pt-2">{info.name} </div>
                <div className="position w-40 text-center pt-2">{info.position}</div>
                <div className="DOB w-40 text-center pt-2">{info.DOB} </div>
                <div className="projects w-40 text-center pt-2 h-10">{info.projects} </div>
                <div className="divend-design w-15 bg-orange"></div>
              </div>
            ))}
          </div>
        </div>

        {ismodelopen && (
          <div className='model-overlay fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50'>
            <div className="model bg-white w-80 md:w-96 p-6 rounded-lg shadow-lg">
              <h2 className='text-xl font-semibold mb-4'>Add New Member</h2>
              <AddMember addNewMem={addNewMem} closemodel={openmodel} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Members
