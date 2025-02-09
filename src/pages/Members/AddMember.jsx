import React, { useState } from 'react'

const AddMember = ({ addNewMem, closemodel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [DOB, setDOB] = useState('');
    const [projects, setProjects] = useState('');
    const [profile, SetProfile] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name && email) {
            const newMem = {
                name,
                email,
                profile,
                projects,
                position,
                DOB
            };
            addNewMem(newMem);
        }
    };


    return (
        <div>
            <form className="add-members" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Enter Name"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Enter Email"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Enter Position"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="date"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Enter DOB"
                    />
                </div>

                <div className='flex justify-between gap-3'> 
                <div className="mb-4">
                    <input
                        type="text"
                        value={projects}
                        onChange={(e) => setProjects(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Projects Count"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="file"
                        value={profile}
                        onChange={(e) => SetProfile(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-lg"
                        placeholder="Upload Name"
                    />
                </div>

                </div>

                <div className="flex justify-end gap-4 my-2">
                    <button
                        type="button"
                        onClick={closemodel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="add-button2 h-20"
                        onClick={handleSubmit}
                    >
                        Add Mem
                    </button>
                </div>



            </form>

        </div>
    )
}

export default AddMember
