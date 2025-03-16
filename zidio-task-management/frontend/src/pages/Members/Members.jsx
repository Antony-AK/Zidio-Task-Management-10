import React, { useEffect, useState } from 'react';
import { getMembers, deleteMember, updateMember, addMember } from '../../utils/api';
import AddMember from './AddMember';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [isModelOpen, setModelOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  const openModel = () => {
    setEditingMember(null);
    setModelOpen(true);
  };

  const openEditModel = (member) => {
    setEditingMember(member);
    setModelOpen(true);
  };

  const addOrUpdateMember = async (memberData) => {
    console.log("Submitting member data:", memberData);

    if (editingMember) {
      try {
        const updated = await updateMember(editingMember._id, memberData);
        console.log("Updated Member Response:", updated);

        if (updated) {
          alert("Member updated successfully!");
          await fetchMembers();  
        }
      } catch (error) {
        console.error("Failed to update member:", error);
        alert("Failed to update member. Please try again.");
      }
    } else {
      try {
        const addedMember = await addMember(memberData);
        if (addedMember) {
          setMembers([...members, addedMember]);
          alert("Member added successfully!");
        }
      } catch (error) {
        console.error("Failed to add member:", error);
        alert("Failed to add member. Please try again.");
      }
    }

    setModelOpen(false);
    setEditingMember(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const success = await deleteMember(id);
      if (success) {
        setMembers(members.filter(member => member._id !== id));
        alert("Member deleted successfully");
      }
    } catch (error) {
      alert("Failed to delete member, please try again.");
    }
  };

  return (
    <div className="members w-full h-full flex flex-col gap-5 p-5">
      <div className="title ml-4" data-aos="fade-right" data-aos-duration="1000">
        <h1 className='text-2xl font-semibold'>Members</h1>
      </div>

      <div className="tasks-head-button flex justify-end gap-5 mt-7 md:mt-1 md:mr-20"  data-aos="fade-left" data-aos-duration="1000">
        <button className='add-button' onClick={openModel}> + Member</button>
      </div>

      <div className="members-info w-[95%] mx-auto mt-5 overflow-x-auto">
        <div className="grid grid-cols-7 h-12 border-t border-l min-w-[1200px] lg:min-w-[800px]"  data-aos="fade-up" data-aos-duration="500">
          {["Profile", "Email", "Name", "Position", "DOB", "Projects", "Remove"].map((title, index) => (
            <div key={index} className="text-center font-base font-semibold p-2 bg-orange text-black">{title}</div>
          ))}
        </div>

        <div className='w-full h-[370px] overflow-y-scroll scrollbar-hide min-w-[1200px] lg:min-w-[800px] '>
          {members.map((info) => (
            <div key={info._id} className="mem-info grid grid-cols-7 bg-white rounded-lg border p-2 hover:border-orange d-flex justify-center items-center gap-3 my-3"  data-aos="fade-up" data-aos-duration="800">
              <div className="profilepics">
                <img src={info.profile} className='w-10 h-10 mx-auto rounded-full' alt={info.name} />
              </div>
              <div className="email text-center">{info.email}</div>
              <div className="name text-center">{info.name}</div>
              <div className="position text-center">{info.position}</div>
              <div className="DOB text-center">{info.DOB}</div>
              <div className="projects text-center">{info.projects}</div>
              <div className="actions flex justify-center ms-4">
                <button onClick={() => handleDelete(info._id)} className="text-red-500 border p-1">Delete</button>
                <button className="edit-button mx-2 text-green-500 border p-1" onClick={() => openEditModel(info)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModelOpen && (
        <div className='model-overlay fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50'>
          <div className="model bg-white w-80 md:w-96 p-6 rounded-lg shadow-lg">
            <h2 className='text-xl font-semibold mb-4'>{editingMember ? "Edit Member" : "Add New Member"}</h2>
            <AddMember addOrUpdateMember={addOrUpdateMember} closeModel={() => setModelOpen(false)} editingMember={editingMember} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
