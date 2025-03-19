import { useEffect, useState } from "react";
import { fetchCompletedTasks } from "../../utils/api";
import { ResponsiveHeatMap } from "@nivo/heatmap";

const TaskChart = ({ projectId }) => {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        fetchCompletedTasks(projectId).then(data => setCompletedTasks(data));
    }, [projectId]);

    // Transform data for heatmap
    const chartData = completedTasks.reduce((acc, task) => {
        const date = new Date(task.completedAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const formattedData = Object.keys(chartData).map(date => ({
        id: date,
        data: [{ x: "Completed Tasks", y: chartData[date] }],
    }));

    if (formattedData.length === 0) {
        return <p className="text-gray-500 mt-10 text-center">No completed tasks data available</p>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg" data-aos="flip-up" data-aos-duration="800">
            <h2 className="text-lg md:text-xl text-center font-semibold">Weekly Task Completion</h2>
            <h2 className="text-xs text-center mt-1  mb-2">(In last 7 days)</h2>
            <div style={{ height: 200, width: "100%" }}>
                <ResponsiveHeatMap
                    data={formattedData}
                    keys={["data"]}
                    indexBy="id"
                    margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                    colors={{
                        type: "sequential",
                        scheme: "oranges", // Change color scheme as needed
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 3,
                        tickPadding: 5,
                        tickRotation: -18,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                />
            </div>
        </div>
    );
};

export default TaskChart;
