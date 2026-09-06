import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CompletedDeliveries = () => {

    const { user } = useAuth();
    const instanceAxios = useAxiosSecure();


    const { data: parcels = [], } = useQuery({
        queryKey: ['parcels', user.email, 'driver-assigned'],
        queryFn: async () => {
            const res = await instanceAxios.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`);
            return res.data;
        }
    })


    const calculatePayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.6;
        }
        else {
            return parcel.cost * 0.8;
        }
    }






    return (
        <div>

            {/* Total */}
            <div className="card card-side bg-base-300 shadow-sm w-68 px-5 my-6">
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
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-sm font-bold">Completed Deliveries</h2>
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
                            <th className="align-middle text-center border-r border-base-300">Pickup District</th>
                            <th className="align-middle text-center border-r border-base-300">Deliveries District</th>
                            <th className="align-middle text-center border-r border-base-300">Amount</th>
                            <th className="align-middle text-center border-r border-base-300">Payout</th>
                            <th className="align-middle text-center border-r border-base-300">Time</th>
                            <th className="align-middle text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            parcels.map((parcel, index) => (
                                <tr key={parcel._id} className="text-center align-middle border-b border-base-300">
                                    <th className="align-middle text-center border-r border-base-300">{index + 1}</th>
                                    <td className="align-middle border-r border-base-300">{parcel.parcelName}</td>



                                    <td className="align-middle border-r border-base-300">
                                        {parcel.senderDistrict}
                                    </td>

                                    <td className="align-middle border-r border-base-300">
                                        {parcel.receiverDistrict}
                                    </td>


                                    <td className="align-middle border-r border-base-300">${parcel.cost}</td>


                                    <td className="align-middle border-r border-base-300">${calculatePayout(parcel)}</td>


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






                                    <td className="align-middle border-r border-base-300">
                                        <button className="btn bg-primary mr-3" title="Cash Out">
                                            Cash Out

                                        </button>
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

export default CompletedDeliveries;