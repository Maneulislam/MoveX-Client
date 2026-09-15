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


            <div className="flex justify-center gap-6 flex-wrap my-6 mb-16">
                {/* Total Parcel Card */}
                <div className="group relative w-64 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col items-center gap-2 px-6 py-8">
                        {/* Icon badge */}
                        <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center mb-2 bg-gradient-to-br from-[#EEF9DA] to-[#DCF4A8] shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                                <defs>
                                    <linearGradient id="iconGrad-total-parcel" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#B2E651" />
                                        <stop offset="100%" stopColor="#7BAF1A" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4L12 2.5z"
                                    fill="url(#iconGrad-total-parcel)"
                                    fillOpacity="0.18"
                                    stroke="url(#iconGrad-total-parcel)"
                                    strokeWidth="1.6"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3.5 7.4L12 12.3l8.5-4.9M12 12.3V21.5"
                                    fill="none"
                                    stroke="url(#iconGrad-total-parcel)"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M7.75 4.95l8.5 4.9" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
                            </svg>
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B2E651] border-2 border-white shadow-sm" />
                        </div>

                        {/* Title */}
                        <div className="text-sm font-bold uppercase tracking-wider text-gray-500">
                            Total Parcel
                        </div>

                        {/* Value */}
                        <div className="text-4xl font-extrabold text-gray-800">
                            {parcelCount.toLocaleString()}
                        </div>

                        {/* Description */}
                        <div className="text-xs text-gray-400 mt-1">Parcels created</div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#B2E651]" />
                    </div>
                </div>

                {/* Total Paid Card */}
                <div className="group relative w-64 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col items-center gap-2 px-6 py-8">
                        {/* Icon badge */}
                        <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center mb-2 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7">
                                <defs>
                                    <linearGradient id="iconGrad-total-paid" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#60A5FA" />
                                        <stop offset="100%" stopColor="#2563EB" />
                                    </linearGradient>
                                </defs>
                                {/* Coin / card body */}
                                <rect
                                    x="3"
                                    y="6"
                                    width="18"
                                    height="13"
                                    rx="2.2"
                                    fill="url(#iconGrad-total-paid)"
                                    fillOpacity="0.18"
                                    stroke="url(#iconGrad-total-paid)"
                                    strokeWidth="1.6"
                                />
                                <path
                                    d="M3 10h18"
                                    stroke="url(#iconGrad-total-paid)"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                                {/* Checkmark */}
                                <path
                                    d="M8.5 14.5l2 2 4-4.2"
                                    fill="none"
                                    stroke="url(#iconGrad-total-paid)"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3B82F6] border-2 border-white shadow-sm" />
                        </div>

                        {/* Title */}
                        <div className="text-sm font-bold uppercase tracking-wider text-gray-500">
                            Total Paid
                        </div>

                        {/* Value */}
                        <div className="text-4xl font-extrabold text-gray-800">
                            {paidCount.toLocaleString()}
                        </div>

                        {/* Description */}
                        <div className="text-xs text-gray-400 mt-1">Successfully paid</div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#3B82F6]" />
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