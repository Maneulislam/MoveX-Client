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
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

// Custom Tooltip
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
                        {dataPoint.deliveredCount.toLocaleString()}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

// Custom Cursor
const CustomCursor = (props) => {
    const { points, height } = props;

    if (!points || !points.length) return null;

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

const RiderDashboardHome = () => {
    const instanceAxios = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: delivered = [],
        isLoading,
    } = useQuery({
        queryKey: ["/riders/delivery-per-day", user?.email],
        queryFn: async () => {
            const res = await instanceAxios.get(`/riders/delivery-per-day?email=${user.email}`);

            return res.data;
        },
    });

    // Prepare data for chart
    const chartData = delivered.map((item) => ({
        name: item._id,
        deliveredCount: item.deliveredCount,
    }));

    return (
        <div className="p-6 space-y-8">


            <div className="flex justify-between">
                <div>
                    <h3 className="text-3xl font-extrabold">Dashboard Overview</h3>
                    <p className="text-gray-500 mt-3 mb-12">You can access all your data and information from anywhere.</p>
                </div>

                <Link to={'/dashboard/assigned-deliveries'} className="btn bg-primary text-lg rounded-lg font-bold px-6 py-6">
                    Assigned Deliveries  <FaArrowRight className="ml-2 text-2xl" />


                </Link>

            </div>




            {/* Top Stats Cards */}
            <div className="flex justify-center gap-5 flex-wrap my-6 mb-16">
                {delivered.map((d) => (
                    <div
                        key={d._id}
                        className="stats shadow bg-base-200"
                    >
                        <div className="stat place-items-center">
                            <div className="stat-title text-xl">
                                Parcel Delivered
                            </div>
                            <div className="stat-value">
                                {d.deliveredCount}
                            </div>

                            <div className="stat-desc">
                                {new Date(d._id).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",

                                })}
                            </div>


                        </div>
                    </div>
                ))}
            </div>

            {/* Area Chart */}
            <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 font-sans shadow-sm">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">
                        Delivery Statistics
                    </h2>
                </div>

                {/* Chart Container */}
                <div className="p-4 bg-white rounded-xl border border-gray-100 h-80">

                    {isLoading ? (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Loading Chart Data...
                        </div>
                    ) : chartData.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            No delivery data available
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="chartGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#C3F038"
                                            stopOpacity={0.8}
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor="#C3F038"
                                            stopOpacity={0.05}
                                        />
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
                                    tick={{
                                        fill: "#6B7280",
                                        fontSize: 12,
                                    }}
                                    dy={10}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "#6B7280",
                                        fontSize: 12,
                                    }}
                                    allowDecimals={false}
                                />

                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={<CustomCursor />}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="deliveredCount"
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

export default RiderDashboardHome;