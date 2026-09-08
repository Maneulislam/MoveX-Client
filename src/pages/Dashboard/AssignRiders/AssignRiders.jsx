import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);
    const instanceAxios = useAxiosSecure();
    const queryClient = useQueryClient();
    const riderModalRef = useRef();

    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await instanceAxios.get('parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    })


    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await instanceAxios.get(`/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`);
            return res.data;
        }
    })


    const handleAssignRider = rider => {

        const riderAssignInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        }

        instanceAxios.patch(`parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {

                if (res.data.modifiedCount) {

                    // Refetch available riders
                    queryClient.invalidateQueries({
                        queryKey: ['riders', selectedParcel.senderDistrict, 'available']
                    });




                    riderModalRef.current.close();

                    parcelsRefetch();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been assigned`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }



    const openRiderModal = parcel => {
        setSelectedParcel(parcel);
        console.log(parcel);
        riderModalRef.current.showModal();
    }


    return (
        <div>

            {/* Total */}
            <div className="card card-side bg-base-300 shadow-sm w-56 px-5 m-6">
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
                        <path d="M2 21a8 8 0 0 1 13.292-6" /><circle cx="10" cy="8" r="5" /><path d="m16 19 2 2 4-4" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-base font-bold">Assign Riders</h2>
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
                            <th className="align-middle text-center border-r border-base-300">Amount</th>
                            <th className="align-middle text-center border-r border-base-300">Pickup District</th>
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
                                        ${parcel.cost}
                                    </td>

                                    <td className="align-middle border-r border-base-300">{parcel.senderDistrict}</td>

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

                                    <td className="align-middle space-x-4">

                                        <button onClick={() => openRiderModal(parcel)} className="btn  bg-primary">
                                            Find Riders
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>





            {/* Modal */}


            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">


                    {/* Modal Table */}

                    <div className="overflow-x-auto mt-10">
                        <table className="table table-zebra w-full border-collapse border border-base-300">
                            <thead>
                                <tr className="bg-base-200 text-center align-middle border-b border-base-300">
                                    <th className="align-middle text-center border-r border-base-300">#</th>
                                    <th className="align-middle text-center border-r border-base-300">Rider Name</th>
                                    <th className="align-middle text-center border-r border-base-300">Email</th>
                                    <th className="align-middle text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    riders.map((rider, index) => (
                                        <tr key={rider._id} className="text-center align-middle border-b border-base-300">
                                            <th className="align-middle text-center border-r border-base-300">{index + 1}</th>
                                            <td className="align-middle border-r border-base-300">{rider.name}</td>


                                            <td className="align-middle border-r border-base-300 max-w-45">
                                                <div className="break-all">
                                                    {rider.email}
                                                </div>
                                            </td>


                                            <td className="align-middle space-x-4">

                                                <button onClick={() => handleAssignRider(rider)} className="btn  bg-primary">
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>




        </div>
    );
};

export default AssignRiders;