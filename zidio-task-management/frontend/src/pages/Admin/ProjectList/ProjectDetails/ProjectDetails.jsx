import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTaskSummary } from "../../../../utils/api";
import BarChartComponent from "../../../../Components/BarChart/BarChartComponent";
import TaskChart from "../../../../Components/TaskLineChart/TaskChart";

const ProjectDetails = ({ projects }) => {
    const { _id } = useParams();
    const [taskstatusData, setTaskStatusData] = useState([]);
    const project = projects.find((proj) => proj._id === _id);

    useEffect(() => {
        const getTaskSummary = async () => {
            if (_id) {
                const summary = await fetchTaskSummary(_id);
                if (summary) {
                    setTaskStatusData([
                        { name: "TODO", value: summary.taskSummary.TODO || 0, fill: "#FF0000" },
                        { name: "In Progress", value: summary.taskSummary["In Progress"] || 0, fill: "#ffa500" },
                        { name: "Review", value: summary.taskSummary.Review || 0, fill: "#FFD700" },
                        { name: "Done", value: summary.taskSummary.Done || 0, fill: "#32cd32" }
                    ]);
                }
            }
        };
        getTaskSummary();
    }, [_id]);


    const meetLink = "https://meet.google.com/your-meeting-id";

    return (
        <div className="w-full md:h-[1500px] lg:h-full bg-lightase flex flex-col rounded-xl p-5 lg:pl-8">
            <div className="title mb-1" data-aos="fade-right" data-aos-duration="1000">
                <h1 className='text-2xl font-semibold '>{project?.name}</h1>
            </div>

            <div className="top-charts flex flex-col  lg:flex-row gap-5 mt-5">
                <div className="taskchart w-full mx-auto md:w-[60%] h-[300px]" >
                    <TaskChart projectId={_id} />
                </div>

                <div className="barchart md:mx-auto">
                    <BarChartComponent data={taskstatusData} />
                </div>
            </div>

            <div className="bottom-charts w-full lg:h-96 mt-5 flex flex-col lg:flex-row gap-5 " data-aos="flip-down" data-aos-duration="2000">
                <div className="members-list md:w-[500px] w-30 h-80 lg:h-52  md:mx-auto  flex flex-col gap-3  p-2  bg-white rounded-lg  shadow-lg overflow-y-scroll scrollbar-hide">
                    <h2 className="font-semibold md:text-lg p-2" >Team Collaboration</h2>
                    {project?.members?.map((member) => (
                        <div key={member._id} className="members md:w-[90%] w-[95%]  mx-auto bg-gray-200/60 mb-1  gap-2  flex text-center items-center  rounded-2xl pl-2 pe-2">
                            <div className="member-profile w-7 h-7 md:w-10 md:h-10 rounded-full  ">
                                <img src={member.profile} alt="" className='rounded-full' />
                            </div>
                            <div className="admin-memeber-details p-1">
                                <p className=' text-left text-sm md:text-md font-semibold'>{member.name}</p>
                                <p className="text-sm font-normal md:font-medium"><span className="text-slate-500  md:font-normal text-xs md:text-sm me-1">Working on:</span>Responsive Navbar</p>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-5 md:flex-row" >
                    <div className="admin-meeting-details w-[300px] h-52  mx-auto bg-white rounded-lg shadow-lg p-2" data-aos="flip-down" data-aos-duration="2500">
                        <h2 className="font-semibold text-lg p-2">Remainders</h2>
                        <div className="meeting-list">
                            <div className="meeting-details flex flex-col gap-2 items-center">
                                <div className="meeting-time mt-3  text-orange flexflex-col justify-center items-center">
                                    <p className="font-semibold text-lg">Meeting about next Project</p>
                                    <p className="text-md text-center text-gray-400">Time : 10:00 - 11:00</p>
                                </div>
                                <div className="meeting-title mt-2 md:mb-3 bg-orange w-[80%] p-3 rounded-full mx-auto flex justify-center items-center hover:scale-95 cursor-pointer transform ease-linear duration-100">
                                    <button onClick={() => window.open(meetLink, "_blank")} className="text-lg font-medium"  >Start Meeting</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="admin-meeting-details w-[300px] h-52 md:h-[200px] bg-white rounded-lg mx-auto shadow-lg p-2 overflow-y-scroll scrollbar-hide" data-aos="flip-down" data-aos-duration="3000">
                        <h2 className="font-semibold text-lg p-2">Activity of Users</h2>
                        <div className="user-status-details flex flex-col justify-center items-center mt-6 gap-6">
                            <h2 className="text-xl me-4  text-black"><span className="font-bold text-black text-3xl me-2">3</span>Active </h2>
                            <h2 className="text-xl me-4 text-black ms-8"><span className="font-bold text-gray-400 text-3xl me-2">1</span>not Active </h2>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
