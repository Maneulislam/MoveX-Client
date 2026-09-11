import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { TiPlusOutline } from "react-icons/ti";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;

        return (
            <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100 text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">{dataPoint.name}</p>
                <p className="text-sm font-bold text-gray-800">{dataPoint.value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const CustomCursor = ({ points, height }) => {
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

const UserDashboardHome = () => {
    const instanceAxios = useAxiosSecure();
    const { user } = useAuth();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["/parcels/create-history", user?.email],
        queryFn: async () => {
            const res = await instanceAxios.get(`/parcels/create-history?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const parcelData = parcels?.[0] || {};
    const parcelCount = Number(parcelData.parcelCount || 0);
    const paidCount = Number(parcelData.paidCount || 0);

    const chartData = [
        {
            name: "Total Parcel",
            value: parcelCount,
        },
        {
            name: "Total Paid",
            value: paidCount,
        },
    ];

    return (
        <div className="p-6 space-y-8">

            <div className="flex justify-between">
                <div>
                    <h3 className="text-3xl font-extrabold">Dashboard Overview</h3>
                    <p className="text-gray-500 mt-3 mb-12">You can access all your data and information from anywhere.</p>
                </div>

                <Link to={'/dashboard/book-parcel'} className="btn bg-primary text-lg rounded-lg font-bold px-6 py-6">
                    <TiPlusOutline className="mr-2 text-3xl" /> Create Parcel


                </Link>

            </div>


            <div className="flex justify-center gap-5 flex-wrap my-6 mb-16">
                <div className="stats shadow bg-base-200">
                    <div className="stat place-items-center">
                        <div className="stat-title text-xl">Total Parcel</div>
                        <div className="stat-value">{parcelCount.toLocaleString()}</div>
                        <div className="stat-desc">All parcels created</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-200">
                    <div className="stat place-items-center">
                        <div className="stat-title text-xl">Total Paid</div>
                        <div className="stat-value">{paidCount.toLocaleString()}</div>
                        <div className="stat-desc">Successfully paid</div>
                    </div>
                </div>
            </div>

            <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 font-sans shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Parcel Statistics</h2>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-100 h-80">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Loading Chart Data...
                        </div>
                    ) : !parcels.length ? (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            No parcel data available
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
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
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
                                    dataKey="value"
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

export default UserDashboardHome;