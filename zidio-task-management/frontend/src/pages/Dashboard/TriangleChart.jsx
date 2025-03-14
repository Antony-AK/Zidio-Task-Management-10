import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TriangleChart = ({ data }) => {
    return (
        <div className="md:w-[470px] mt-10 lg:mt-0 h-full mx-auto p-5 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center mb-3">Projects Progress</h3>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    {data.slice(0, Math.ceil(data.length / 2)).map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-4 h-4" style={{ backgroundColor: entry.fill }}></div>
                            <span className="text-sm">{entry.name}</span>
                        </div>
                    ))}
                </div>

                <ResponsiveContainer width={150} height={150}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50% "
                            cy="50%"
                            innerRadius={40}
                            outerRadius={65}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <div className="flex flex-col gap-2">
                    {data.slice(Math.ceil(data.length / 2)).map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-4 h-4" style={{ backgroundColor: entry.fill }}></div>
                            <span className="text-sm">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TriangleChart;
