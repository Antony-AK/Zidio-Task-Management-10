import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const BarChartComponent = ({ data }) => {
    return (
        <div className="md:w-[450px] mt-10 lg:mt-0 h-[300px] p-2 bg-white rounded-lg shadow-md" data-aos="flip-up" data-aos-duration="1500">
            <h3 className="text-lg font-semibold text-center mt-2 mb-2">Task Status Overview</h3>
            <ResponsiveContainer width="95%" height={250}>
                <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" tick={{ fill: "#555" }} />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="value" barSize={50} radius={[5, 5, 0, 0]}>
                        {data.map((entry, index) => (
                            <Bar key={index} dataKey="value" fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
