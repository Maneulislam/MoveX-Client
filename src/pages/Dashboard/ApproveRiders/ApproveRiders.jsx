import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserCheck, FaUserXmark } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';

const ApproveRiders = () => {

    const instanceAxios = useAxiosSecure();

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['/riders', 'pending'],
        queryFn: async () => {
            const res = await instanceAxios.get('/riders');
            return res.data;
        }
    })
    console.log(riders);


    const updateRiderStatus = (rider, status) => {

        const updateInfo = { status: status, email: rider.email };

        instanceAxios.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {

                    refetch();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status is set to ${status}`,
                        showConfirmButton: false,
                        timer: 2500
                    });

                }
            })

    }


    const handleApproval = (rider) => {
        updateRiderStatus(rider, 'approved');

    }


    const handleRejection = rider => {
        updateRiderStatus(rider, 'rejected');
    }


    const handleRiderDelete = (id) => {

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
                instanceAxios.delete(`riders/${id}`)
                    .then(res => {
                        console.log(res.data);


                        if (res.data.deletedCount) {

                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Rider has been deleted.",
                                icon: "success"
                            });

                        }
                    })


            }
        });
    };


    const handleView = async (id) => {
        try {
            const res = await instanceAxios.get(`/riders/${id}`);
            const rider = res.data;

            Swal.fire({
                title: `<strong>${rider.name}</strong>`,
                icon: 'info',
                html: `
                <div style="text-align: left; font-size: 14px; line-height: 1.8;">
                    <p><strong>Name:</strong> ${rider.name}</p>
                    <p><strong>Driving License:</strong> ${rider.drivingLicense}</p>
                    <p><strong>Email:</strong> ${rider.email}</p>
                    <p><strong>Region:</strong> ${rider.region}</p>
                    <p><strong>District:</strong> ${rider.district}</p>
                    <p><strong>NID:</strong> ${rider.nid}</p>
                    <p><strong>Phone:</strong> ${rider.phone}</p>
                    <p><strong>Bike Model:</strong> ${rider.bikeModel}</p>
                    <p><strong>Bike Registration:</strong> ${rider.bikeRegistration}</p>
                    <p><strong>About Yourself:</strong> ${rider.aboutYourself}</p>
                    <p><strong>Status:</strong> ${rider.status}</p>
                    <p><strong>Created At:</strong> ${new Date(rider.createdAt).toLocaleString("en-GB", {
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
            console.error("Error fetching rider details:", error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to load rider details.',
                icon: 'error'
            });
        }
    };



    return (
        <div>


            {/* Total */}
            <div className="card card-side bg-base-300 shadow-sm w-64 px-5 m-6">
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
                        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M16 22a4 4 0 0 0-8 0" /><circle cx="12" cy="15" r="3" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-base font-bold">Total Application</h2>
                    <p className="text-3xl font-bold">{riders.length}</p>
                </div>
            </div>





            {/* Table */}
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra w-full border-collapse border border-base-300">
                    <thead>
                        <tr className="bg-base-200 text-center align-middle border-b border-base-300">
                            <th className="align-middle text-center border-r border-base-300">#</th>
                            <th className="align-middle text-center border-r border-base-300">Name</th>
                            <th className="align-middle text-center border-r border-base-300">Email</th>
                            <th className="align-middle text-center border-r border-base-300">District</th>
                            <th className="align-middle text-center border-r border-base-300">Application Status</th>
                            <th className="align-middle text-center border-r border-base-300">Work Status</th>
                            <th className="align-middle text-center border-r border-base-300">Time</th>
                            <th className="align-middle text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            riders.map((rider, index) => (
                                <tr key={rider._id} className="text-center align-middle border-b border-base-300">
                                    <th className="align-middle text-center border-r border-base-300">{index + 1}</th>
                                    <td className="align-middle border-r border-base-300">{rider.name}</td>
                                    <td className="align-middle border-r border-base-300">{rider.email}</td>

                                    <td className="align-middle border-r border-base-300">{rider.district}</td>

                                    <td
                                        className={` align-middle border-r border-base-300 ${rider.status === 'approved'
                                            ? ' badge-success'
                                            : rider.status === 'pending'
                                                ? 'text-black'
                                                : 'badge-error'
                                            }`}
                                    >
                                        <div className="badge badge-soft">{rider.status}</div>

                                    </td>


                                    <td className="align-middle border-r border-base-300 text-center whitespace-nowrap">
                                        <div
                                            className={`inline-flex items-center justify-center ${rider.workStatus === 'available'
                                                ? 'badge badge-soft badge-success'
                                                : rider.workStatus === 'in-delivery' ?
                                                    'badge badge-soft badge-info'
                                                    :
                                                    'text-black'
                                                }`}
                                        >
                                            {rider.workStatus}
                                        </div>
                                    </td>


                                    <td className="align-middle border-r border-base-300">
                                        {new Date(rider.createdAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>

                                    <td className="align-middle space-x-2">

                                        <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 sm:gap-2">
                                            <button onClick={() => handleView(rider._id)} title="View details" className="btn btn-square hover:bg-primary">
                                                <FiSearch size={20} />

                                            </button>


                                            <button onClick={() => handleApproval(rider)} title="Accept Request" className="btn btn-square hover:bg-primary">
                                                <FaUserCheck size={20} />

                                            </button>

                                            <button onClick={() => { handleRejection(rider) }} title="Reject Request" className="btn btn-square hover:bg-primary">
                                                <FaUserXmark size={20} />
                                            </button>

                                            <button onClick={() => handleRiderDelete(rider._id)} title="Remove Rider" className="btn btn-square hover:bg-primary">
                                                <RiDeleteBin5Line size={20} />
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

export default ApproveRiders;