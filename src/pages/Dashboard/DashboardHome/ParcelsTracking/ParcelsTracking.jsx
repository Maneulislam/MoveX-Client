import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ParcelsTracking = () => {
    const { user } = useAuth();
    const instanceAxios = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await instanceAxios.get(`parcels?email=${user?.email}`);
            return res.data;
        },
    });



    return (
        <div>

            {/* Total */}
            <div className="card card-side bg-base-300 shadow-sm w-60 px-5 m-6">
                <figure>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-land-plot-icon lucide-land-plot"
                    >
                        <path d="M12 12v5.5" /><path d="M17 3h2a2 2 0 012 2v2" /><path d="M21 17v2a2 2 0 01-2 2h-2" /><path d="M3 7V5a2 2 0 012-2h2" /><path d="M7 21H5a2 2 0 01-2-2v-2" /><path d="M7.264 9.252 12 12l4.737-2.748" /><path d="M7.995 8.514A2 2 0 007 10.244v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0017 13.76v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-base font-bold">Total Parcels</h2>
                    <p className="text-3xl font-bold">{parcels.length}</p>
                </div>
            </div>




            {/* Table */}
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra w-full border-collapse border border-base-300">
                    <thead>
                        <tr className="bg-base-200 text-center align-middle border-b border-base-300">
                            <th className="align-middle text-center border-r border-base-300">#</th>
                            <th className="align-middle text-center border-r border-base-300">Parcel Name</th>
                            <th className="align-middle text-center border-r border-base-300">Delivery Status</th>
                            <th className="align-middle text-center border-r border-base-300">Tracking Button</th>
                            <th className="align-middle text-center border-r border-base-300">Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            parcels.map((parcel, index) => (
                                <tr key={parcel._id} className="text-center align-middle border-b border-base-300">
                                    <th className="align-middle text-center border-r border-base-300">{index + 1}</th>
                                    <td className="align-middle border-r border-base-300">{parcel.parcelName}</td>




                                    <td className="align-middle border-r border-base-300">
                                        <div
                                            className={`
                                                         ${parcel.deliveryStatus === 'parcel-delivered'
                                                    ? 'badge badge-soft badge-success '
                                                    : parcel.deliveryStatus === 'parcel-picked-up'
                                                        ? 'badge badge-soft badge-info'
                                                        : parcel.deliveryStatus === 'rider-rejected' ?
                                                            'badge badge-soft badge-error'
                                                            : parcel.deliveryStatus === 'pending-pickup' ||
                                                                parcel.deliveryStatus === 'driver-assigned' ||
                                                                parcel.deliveryStatus === 'rider-arriving'
                                                                ? 'badge badge-soft text-black'
                                                                : ''

                                                }
                                                        `}
                                        >
                                            {parcel.deliveryStatus}
                                        </div>
                                    </td>

                                    <td className="align-middle border-r border-base-300">
                                        <Link to={`/parcel-track/${parcel.trackingId}`} className="btn hover:bg-primary border-2 border-primary">
                                            {parcel.trackingId}
                                        </Link>
                                    </td>

                                    <td className="align-middle border-r border-base-300">
                                        {new Date(parcel.createdAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>


                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default ParcelsTracking;