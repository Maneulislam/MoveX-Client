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
            {/* Top Stats Cards */}
            <div className="flex justify-center gap-5 flex-wrap my-6 mb-16">
                {deliveryStats.map((stat) => (
                    <div key={stat._id} className="stats shadow bg-base-200">
                        <div className="stat place-items-center">
                            <div className="stat-title text-xl">
                                {stat._id.split("-").join(" ").charAt(0).toUpperCase() +
                                    stat._id.split("-").join(" ").slice(1)}
                            </div>
                            <div className="stat-value">{stat.count}</div>
                            <div className="stat-desc">
                                {new Date(stat.createdAt).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </div>
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