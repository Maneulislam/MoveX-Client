import { useQuery } from "@tanstack/react-query";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

// Custom Tooltip for Chart Hover
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;
        return (
            <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100 text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">
                    {dataPoint.name}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B2E651]"></span>
                    <p className="text-sm font-bold text-gray-800">
                        {dataPoint.count.toLocaleString()}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

// Custom Dashed Cursor Line
const CustomCursor = (props) => {
    const { points, height } = props;
    const { x } = points[0];
    return (
        <line
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke="#B2E651"
            strokeWidth={1.5}
            strokeDasharray="3 3"
        />
    );
};



const AdminDashboardHome = () => {
    const instanceAxios = useAxiosSecure();

    const { data: deliveryStats = [], isLoading } = useQuery({
        queryKey: ["/parcels/delivery-status/stats"],
        queryFn: async () => {
            const res = await instanceAxios.get("/parcels/delivery-status/stats");
            return res.data;
        },
    });

    // Transform deliveryStats for the chart
    const chartData = deliveryStats.map((stat) => ({
        name: stat._id
            ? stat._id
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "Unknown",
        count: stat.count,
    }));

    return (
        <div className="p-6 space-y-8">


            <div className="flex justify-between">
                <div>
                    <h3 className="text-3xl font-extrabold">Dashboard Overview</h3>
                    <p className="text-gray-500 mt-3 mb-12">You can access all your data and information from anywhere.</p>
                </div>

                <Link to={'/dashboard/assign-riders'} className="btn bg-primary text-lg rounded-lg font-bold px-6 py-6">
                    Assign Riders  <FaArrowRight className="ml-2 text-2xl" />


                </Link>

            </div>


            {/* Top Stats Cards */}
            <div className="flex justify-center gap-6 flex-wrap my-6 mb-16">
                {deliveryStats.map((stat) => (
                    <div
                        key={stat._id}
                        className="group relative w-64 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-2 px-6 py-8">
                            {/* Icon badge */}
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 bg-[#EEF9DA] group-hover:scale-110 transition-transform duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-[#8FC31F]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                    />
                                </svg>
                            </div>

                            {/* Title */}
                            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                {stat._id
                                    ? stat._id
                                        .split("-")
                                        .join(" ")
                                        .replace(/\b\w/g, (c) => c.toUpperCase())
                                    : "Unknown"}
                            </div>

                            {/* Value */}
                            <div className="text-4xl font-extrabold text-gray-800">
                                {stat.count.toLocaleString()}
                            </div>

                            {/* Timestamp */}
                            <div className="text-xs text-gray-400 mt-1">
                                {new Date(stat.createdAt).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 h-1 w-full bg-[#B2E651]" />
                        </div>
                    </div>
                ))}
            </div>


            {/* Area Chart Section */}
            <div className="w-full p-6  bg-white rounded-2xl border border-gray-200 font-sans shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">
                        Overall Statistics
                    </h2>
                    <div className="flex items-center gap-2">



                    </div>
                </div>


                {/* Chart Container */}
                <div className="p-4 bg-white rounded-xl border border-gray-100 h-80">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Loading Chart Data...
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#C3F038" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#C3F038" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#E5E7EB"
                                    vertical={true}
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6B7280", fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6B7280", fontSize: 12 }}
                                    tickFormatter={(value) =>
                                        value >= 1000 ? `${value / 1000}k` : `${value}`
                                    }
                                />
                                <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#B2E651"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#chartGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;