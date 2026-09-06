import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { PiUserCircleCheckBold } from 'react-icons/pi';
import { ImCross } from 'react-icons/im';
import Swal from 'sweetalert2';

const AssignDeliveries = () => {

    const { user } = useAuth();
    const instanceAxios = useAxiosSecure();

    const queryClient = useQueryClient();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver-assigned'],
        queryFn: async () => {
            const res = await instanceAxios.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`);
            return res.data;
        }
    })


    const handleDeliveryStatusUpdate = (parcel, status) => {
        const updateInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        };

        const message = `Parcel status is updated with ${status.split('-').join(' ')}`

        instanceAxios.patch(`/parcels/${parcel._id}/status`, updateInfo)
            .then(res => {

                if (res.data.modifiedCount) {


                    // Refetch available riders
                    queryClient.invalidateQueries({
                        queryKey: ['parcels', user.email, 'parcel-delivered']
                    });

                    refetch();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }




    return (
        <div>

            {/* Total */}
            <div className="card card-side bg-base-300 shadow-sm w-56 px-5 my-6">
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
                        <path d="M12 22V12" /><path d="m16 17 2 2 4-4" /><path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" /><path d="M3.29 7 12 12l8.71-5" /><path d="m7.5 4.27 8.997 5.148" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-sm font-bold">Parcels Pending</h2>
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
                            <th className="align-middle text-center border-r border-base-300">Amount</th>
                            {/* <th className="align-middle text-center border-r border-base-300">Time</th> */}
                            <th className="align-middle text-center border-r border-base-300">Confirm Actions</th>
                            <th className="align-middle text-center">Other Actions</th>
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
                                                         ${parcel.deliveryStatus === 'driver-assigned'
                                                    ? ' badge badge-soft text-black'
                                                    : parcel.deliveryStatus === 'rider-rejected' ?
                                                        'badge badge-soft badge-error'
                                                        :
                                                        'badge badge-soft badge-success'
                                                }
                                                        `}
                                        >
                                            {parcel.deliveryStatus}
                                        </div>
                                    </td>


                                    <td className="align-middle border-r border-base-300">${parcel.cost}</td>

                                    {/* <td className="align-middle border-r border-base-300">
                                        {new Date(parcel.createdAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td> */}



                                    <td className="align-middle space-x-4 border-r border-base-300" >

                                        {
                                            parcel.deliveryStatus === 'driver-assigned' ? <>
                                                <button onClick={() => handleDeliveryStatusUpdate(parcel, 'rider-arriving')} className="btn btn-square hover:bg-primary" title="Accept">
                                                    <PiUserCircleCheckBold size={30} />

                                                </button>

                                                <button onClick={() => handleDeliveryStatusUpdate(parcel, 'rider-rejected')} className="btn btn-square hover:bg-primary" title="Reject" >
                                                    <ImCross size={22} />

                                                </button>
                                            </>
                                                :
                                                <>

                                                    <div className="align-middle">
                                                        {parcel.deliveryStatus !== 'rider-rejected' ? (
                                                            <div className="badge badge-soft badge-success">
                                                                Accepted
                                                            </div>
                                                        ) : parcel.deliveryStatus === 'rider-rejected' ? (
                                                            <div className="badge badge-soft badge-error">
                                                                Rejected
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                </>
                                        }



                                    </td>



                                    {
                                        parcel.deliveryStatus !== 'rider-rejected' && <>

                                            <td className="align-middle border-r border-base-300">
                                                <button onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-picked-up')} className="btn hover:bg-primary mr-3" title="Picked Up">
                                                    Picked Up

                                                </button>

                                                <button onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-delivered')} className="btn hover:bg-primary" title="Delivered" >
                                                    Delivered

                                                </button>
                                            </td>

                                        </>
                                    }


                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default AssignDeliveries;