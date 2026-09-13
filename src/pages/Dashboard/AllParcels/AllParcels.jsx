import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router";
import { useState } from "react";

const AllParcels = () => {

    const instanceAxios = useAxiosSecure();
    const [search, setSearch] = useState('');

    const { data: parcelsSearch = [] } = useQuery({
        queryKey: ['allParcels', search],
        queryFn: async () => {
            const res = await instanceAxios.get(`/parcels?search=${search}`);
            return res.data;
        }
    });


    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels'],
        queryFn: async () => {
            const res = await instanceAxios.get(`parcels`);

            return res.data;
        },
    });








    const handleView = async (id) => {
        try {
            const res = await instanceAxios.get(`/parcels/${id}`);
            const parcel = res.data;

            Swal.fire({
                title: `<strong>${parcel.parcelName}</strong>`,
                icon: 'info',
                html: `
                <div style="text-align: left; font-size: 14px; line-height: 1.8;">

                    <p><strong>Sender Name:</strong> ${parcel.senderName}</p>
                    <p><strong>Sender Email:</strong> ${parcel.senderEmail}</p>
                    <p><strong>Sender Region:</strong> ${parcel.senderRegion}</p>
                    <p><strong>Sender District:</strong> ${parcel.senderDistrict}</p>

                    <p><strong>Receiver Name:</strong> ${parcel.receiverName}</p>
                    <p><strong>Receiver Email:</strong> ${parcel.receiverEmail}</p>
                    <p><strong>Receiver Phone:</strong> ${parcel.receiverPhone}</p>
                    <p><strong>Receiver Address:</strong> ${parcel.receiverAddress}</p>
                    <p><strong>Receiver Region:</strong> ${parcel.receiverRegion}</p>
                    <p><strong>Receiver District:</strong> ${parcel.receiverDistrict}</p>
                    <p><strong>Document Type:</strong> ${parcel.docType}</p>
                    <p><strong>Weight:</strong> ${parcel.parcelWeight} kg</p>
                    <p><strong>Amount:</strong> $${parcel.cost}</p>
                    <p><strong>Delivery Status:</strong> ${parcel.deliveryStatus}</p>
                    <p><strong>Tracking ID:</strong> ${parcel.trackingId}</p>
                    <p><strong>Transaction ID:</strong> ${parcel.transactionId}</p>
                    <p><strong>Created At:</strong> ${new Date(parcel.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })}</p>

                </div>
            `,
                showCloseButton: true,
                confirmButtonText: 'Close',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.error("Error fetching parcel details:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load parcel details.',
                icon: 'error'
            });
        }
    };



    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instanceAxios.delete(`parcels/${id}`)
                    .then(res => {
                        console.log(res.data);


                        if (res.data.deletedCount) {

                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });

                        }
                    })


            }
        });
    };






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
                        <path d="m12 8 6-3-6-3v10" />
                        <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
                        <path d="m6.49 12.85 11.02 6.3" />
                        <path d="M17.51 12.85 6.5 19.15" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-base font-bold">Total Parcels</h2>
                    <p className="text-3xl font-bold">{parcels.length}</p>
                </div>
            </div>




            {/* Search */}
            <div className="w-full max-w-md mt-10">
                <label className="relative flex items-center w-full pr-24 rounded-sm border-2 border-base-300 focus-within:border-primary focus-within:outline-none focus-within:ring-0">

                    <svg className="h-5 w-5 opacity-60 ml-3 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <path d="m21 21-4.3-4.3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>


                    <input onChange={(e) => setSearch(e.target.value)} className="bg-transparent grow border-none text-sm md:text-base px-2 py-2 outline-none focus:outline-none focus:ring-0" name="location" type="search" placeholder="Search Parcel" />


                    <button type="submit" className="btn bg-primary text-black border-none absolute right-1 top-1 bottom-1 px-5 min-h-0 h-auto">
                        Search
                    </button>
                </label>
            </div>






            {/* Table */}
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra w-full border-collapse border border-base-300">
                    <thead>
                        <tr className="bg-base-200 text-center align-middle border-b border-base-300">
                            <th className="align-middle text-center border-r border-base-300">#</th>
                            <th className="align-middle text-center border-r border-base-300">Parcel Name</th>
                            <th className="align-middle text-center border-r border-base-300">Sender Email</th>
                            <th className="align-middle text-center border-r border-base-300">Receiver Email</th>
                            <th className="align-middle text-center border-r border-base-300">Delivery Status</th>
                            <th className="align-middle text-center border-r border-base-300">Tracking ID</th>
                            <th className="align-middle text-center border-r border-base-300">Amount</th>
                            <th className="align-middle text-center border-r border-base-300">Time</th>
                            <th className="align-middle text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (search ? parcelsSearch : parcels).map((parcel, index) => (
                                <tr key={parcel._id} className="text-center align-middle border-b border-base-300">
                                    <th className="align-middle text-center border-r border-base-300">{index + 1}</th>
                                    <td className="align-middle border-r border-base-300">{parcel.parcelName}</td>


                                    <td className="align-middle border-r border-base-300">

                                        {parcel.senderEmail?.split('@')[0]}@...

                                    </td>

                                    <td className="align-middle border-r border-base-300">

                                        {parcel.receiverEmail?.split('@')[0]}@...

                                    </td>



                                    <td className="align-middle border-r border-base-300 p-2 sm:p-4 whitespace-nowrap">
                                        <div
                                            className={`text-xs sm:text-sm px-2 sm:px-3 py-1 $ ${parcel.deliveryStatus === 'parcel-delivered'

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
                                                }`}
                                        >
                                            {parcel.deliveryStatus}
                                        </div>
                                    </td>



                                    <td className="align-middle border-r border-base-300">

                                        <Link to={`/parcel-track/${parcel.trackingId}`} className="btn hover:bg-primary border-2 border-primary truncate ">

                                            {parcel.trackingId}

                                        </Link>

                                    </td>



                                    <td className="align-middle border-r border-base-300">${parcel.cost}</td>
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



                                    <td className="align-middle px-2 py-3">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-start sm:justify-center">
                                            <button
                                                onClick={() => handleView(parcel._id)}
                                                title="View Details"
                                                className="btn btn-square btn-sm sm:btn-md hover:bg-primary"
                                            >
                                                <FiSearch className="text-base sm:text-xl" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(parcel._id)}
                                                title="Remove Parcels"
                                                className="btn btn-square btn-sm sm:btn-md hover:bg-primary"
                                            >
                                                <RiDeleteBin5Line className="text-base sm:text-xl" />
                                            </button>
                                        </div>
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

export default AllParcels;