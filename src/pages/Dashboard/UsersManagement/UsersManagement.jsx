import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserShield } from "react-icons/fa";
import { useState } from "react";
import { FaUserXmark } from "react-icons/fa6";

const UsersManagement = () => {

    const instanceAxios = useAxiosSecure();
    const [search, setSearch] = useState('');

    const { data: users = [], refetch } = useQuery({
        queryKey: ['/users', search],
        queryFn: async () => {
            const res = await instanceAxios.get(`/users?search=${search}`);
            return res.data;
        }
    })


    const handleRole = (user, role) => {
        const roleInfo = { role: role, email: user.email };


        Swal.fire({
            title: "Are you sure?",
            text: `${user.role === 'admin' ? `${user.displayName} remove Admin?` : `${user.displayName} make Admin?`}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}`
        }).then((result) => {
            if (result.isConfirmed)

                instanceAxios.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {

                            refetch();

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.role === 'admin' ? `${user.displayName} Admin removed successfully` : `${user.displayName} Admin created successfully`}`,
                                showConfirmButton: false,
                                timer: 2500
                            });

                        }

                    })
        });
    }

    console.log(users);



    const makeAdmin = user => {
        handleRole(user, 'admin');
    }

    const removeAdmin = user => {
        handleRole(user, 'user');
    }




    return (
        <div>


            {/* Total */}
            <div className="card card-side bg-base-300 shadow-sm w-52 px-5  ">
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
                        <path d="M17.925 20.056a6 6 0 0 0-11.851.001" /><circle cx="12" cy="11" r="4" /><circle cx="12" cy="12" r="10" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-sm font-bold">Total Users</h2>
                    <p className="text-3xl font-bold">{users.length}</p>
                </div>
            </div>


            {/* Search */}
            <div className="w-full max-w-md mt-10">
                <label className="relative flex items-center w-full pr-24 rounded-sm border-2 border-base-300 focus-within:border-primary focus-within:outline-none focus-within:ring-0">

                    <svg className="h-5 w-5 opacity-60 ml-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <path d="m21 21-4.3-4.3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>


                    <input onChange={(e) => setSearch(e.target.value)} className="bg-transparent grow border-none text-sm md:text-base px-2 py-2 outline-none focus:outline-none focus:ring-0" name="location" type="search" placeholder="Search user" />


                    <button type="submit" className="btn bg-primary text-black border-none absolute right-1 top-1 bottom-1 px-5 min-h-0 h-auto">
                        Search
                    </button>
                </label>
            </div>



            {/* Table */}
            <div className="overflow-x-auto mt-7">
                <table className="table table-zebra w-full border-collapse border border-base-300">
                    <thead>
                        <tr className="bg-base-200 text-center align-middle border-b border-base-300">
                            <th className="align-middle text-center border-r border-base-300">#</th>
                            <th className="align-middle text-center border-r border-base-300">Photo</th>
                            <th className="align-middle text-center border-r border-base-300">Name</th>
                            <th className="align-middle text-center border-r border-base-300">Email</th>
                            <th className="align-middle text-center border-r border-base-300">Role</th>
                            <th className="align-middle text-center border-r border-base-300">Admin Action</th>
                            <th className="align-middle text-center border-r border-base-300">Time</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user, index) => (
                                console.log(user),
                                <tr key={user._id} className="text-center align-middle border-b border-base-300">
                                    <th className="align-middle text-center border-r border-base-300">{index + 1}</th>




                                    <td className="align-middle border-r border-base-300">
                                        <div className="w-12 h-12">
                                            {
                                                user?.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user?.displayName || "User"}
                                                        referrerPolicy="no-referrer"
                                                        className="w-12 h-12 rounded-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = "none";
                                                            e.currentTarget.nextElementSibling.classList.remove("hidden");
                                                            e.currentTarget.nextElementSibling.classList.add("flex");
                                                        }}
                                                    />
                                                ) : null
                                            }

                                            <div
                                                className={`w-12 h-12 rounded-full bg-[#c93612] items-center justify-center ${user?.photoURL ? "hidden" : "flex"
                                                    }`}
                                            >
                                                <span className="text-white text-2xl font-normal">
                                                    {user?.displayName?.trim()?.charAt(0)?.toUpperCase() || "U"}
                                                </span>
                                            </div>
                                        </div>
                                    </td>


                                    <td className="align-middle border-r border-base-300">{user.displayName}</td>
                                    <td className="align-middle border-r border-base-300">{user.email}</td>

                                    <td
                                        className={` align-middle border-r border-base-300 ${user.role === 'admin'
                                            ? ' badge-success'
                                            : user.role === 'user'
                                                ? 'text-black'
                                                : 'badge-info'
                                            }`}
                                    >
                                        <div className="badge badge-soft">{user.role}</div>

                                    </td>



                                    <td className="align-middle space-x-4">
                                        {
                                            user.role === 'admin' ?
                                                <button onClick={() => removeAdmin(user)}
                                                    title="Remove Admin"
                                                    className="btn btn-square hover:bg-primary bg-red-600">
                                                    <FaUserXmark size={20} />

                                                </button>
                                                :

                                                <button onClick={() => makeAdmin(user)} title="Make Admin" className="btn btn-square hover:bg-primary">
                                                    <FaUserShield size={25} />

                                                </button>
                                        }
                                    </td>


                                    <td className="align-middle border-r border-base-300">
                                        {new Date(user.createdAt).toLocaleString("en-GB", {
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

export default UsersManagement;