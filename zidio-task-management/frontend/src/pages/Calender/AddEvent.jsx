import React, { useEffect, useState } from 'react'

const AddEvent = ({addnewevent}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [stime, setStime] = useState('');
    const [etime, setEtime] = useState('');


    const handlesubmit = (e) => {
        e.preventDefault();


        if(!title || !description|| !date){
            alert("Please fill in all required fields.");
            return;
        }


        const newevent = {
            title,
            description,
            date,
            starttime: stime,
            endtime: etime,
            color: "bg-blue-300",
        };
        addnewevent(newevent);
    
};
    
    return (
        <div>
            <form onSubmit={handlesubmit} >
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Add Event</h2>
                    </div>
                    <div>
                        <button type='submit' className='w-20 h-8 bg-orange text-white border-orange flex text-center justify-center items-center rounded-md gap-2 border '>save</button>
                    </div>
                </div>

                <hr className='bg-slate-400' />

                <div className="add-details flex mx-2 md:mx-5 my-2 md:my-5 gap-3 md:gap-5">
                    <div className="logos flex flex-col gap-8 text-lg text-gray-400">
                        <p><i class="ri-sticky-note-add-line"></i></p>
                        <p><i class="ri-time-line"></i></p>
                        <p className='mt-32 md:mt-0'><i class="ri-article-line"></i></p>
                    </div>

                    <div className="details-event w-72 md:w-96">
                        <input type="text"
                          className='w-full outline-none '
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}/>
                        <hr className='bg-slate-400 my-4' />
                        <div className="date-time flex md:flex-row flex-col gap-4">
                            <input type="date" className='outline-none border p-1'
                             value={date}
                             onChange={(e) => setDate(e.target.value)}/> 
                            <input type="time"  
                            value={stime}
                          onChange={(e) => setStime(e.target.value)}/> 
                            <p className='text-center'>to</p>
                            <input type="time" 
                             value={etime}
                             onChange={(e) => setEtime(e.target.value)}/>
                        </div>
                        <hr className='bg-slate-400 my-4' />
                        <textarea className='w-full h-32 bg-lightase outline-none p-2'
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>




            </form>


        </div>
    )
}

export default AddEvent
