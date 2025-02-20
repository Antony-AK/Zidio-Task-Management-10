import React, { useState, useEffect } from 'react';

const AddMember = ({ addOrUpdateMember, closeModel, editingMember }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [DOB, setDOB] = useState('');
  const [projects, setProjects] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name || '');
      setEmail(editingMember.email || '');
      setPosition(editingMember.position || '');
      setDOB(editingMember.DOB || '');
      setProjects(editingMember.projects || '');
      setProfile(editingMember.profile || '');
    }
  }, [editingMember]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = { name, email, position, DOB, projects, profile };

    console.log("Submitting member form data:", memberData);
    
    await addOrUpdateMember(memberData);
    closeModel();
  };

  return (
    <div>
      <form className="add-members" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg" placeholder="Enter Name" required />
        </div>

        <div className="mb-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg" placeholder="Enter Email" required />
        </div>

        <div className="mb-4">
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 border rounded-lg" placeholder="Enter Position" required />
        </div>

        <div className="mb-4">
          <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)}
            className="w-full p-2 border rounded-lg" required />
        </div>

        <div className="mb-4">
          <input type="text" value={projects} onChange={(e) => setProjects(e.target.value)}
            className="w-full p-2 border rounded-lg" placeholder="Enter Projects" />
        </div>

        <div className="mb-4">
          <input type="url" value={profile} onChange={(e) => setProfile(e.target.value)}
            className="w-full p-2 border rounded-lg" placeholder="Enter Profile Image URL" />
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={closeModel} className="cancel-button">Cancel</button>
          <button type="submit" className="add-button2">{editingMember ? "Update Member" : "Add Member"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
