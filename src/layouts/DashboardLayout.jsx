import { useRef } from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {

    const { role } = useRole();
    console.log(role);

    const drawerInputRef = useRef(null);

    const closeDrawer = () => {
        if (drawerInputRef.current) {
            drawerInputRef.current.checked = false;
        }
    };

    const toggleDrawer = () => {
        if (drawerInputRef.current) {
            drawerInputRef.current.checked = !drawerInputRef.current.checked;
        }
    };


    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-5    ${isActive ? "bg-primary text-black font-bold rounded-md" : "text-gray-300 hover:bg-gray-700 hover:text-white  "
        }`;



    return (
        <div className="drawer lg:drawer-open min-h-screen ">
            <input
                ref={drawerInputRef}
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content flex flex-col">
                <nav className="navbar w-full shadow-sm bg-white px-4 flex items-center gap-2">
                    <button
                        onClick={toggleDrawer}
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost drawer-button lg:hidden"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-8"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </button>

                    <div className="flex-1 pl-2 text-2xl font-bold">
                        ZapShift Dashboard
                    </div>
                </nav>

                <main className="p-4 flex-1">
                    <Outlet />
                </main>
            </div>

            <div className="drawer-side z-40 shadow-sm">
                <div
                    onClick={closeDrawer}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></div>

                <div className="flex min-h-full flex-col shadow-sm bg-secondary  w-64 text-base-content">

                    <div className="flex items-center border-b border-gray-600 h-16 px-5 text-white justify-between mb-6 pb-2  ">
                        <Logo />

                        {/* Drawer close button */}
                        <button
                            onClick={closeDrawer}
                            aria-label="close sidebar"
                            className="btn btn-sm btn-circle pt-3 text-gray-500 hover:text-white btn-ghost lg:hidden"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>


                    <ul className="menu w-full grow gap-5 p-5 mx-auto">

                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                onClick={closeDrawer}
                                className={navLinkClass}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard size-7">
                                    <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
                                </svg>
                                <span className="text-base">Dashboard</span>
                            </NavLink>
                        </li>




                        {
                            role === 'user' && <>

                                <li>
                                    <NavLink
                                        to="/dashboard/book-parcel"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="M12 13V7" /><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /><path d="m9 10 3 3 3-3" />
                                        </svg>
                                        <span className="text-base">Book a Parcel</span>
                                    </NavLink>
                                </li>

                            </>
                        }






                        {
                            role === 'user' && <>

                                <li>
                                    <NavLink
                                        to="/dashboard/be-rider"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" />

                                        </svg>
                                        <span className="text-base">Be a Rider</span>
                                    </NavLink>
                                </li>

                            </>
                        }


                        {
                            role === 'user' && <>


                                <li>
                                    <NavLink
                                        to="/dashboard/my-parcels"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="M10 22v-8" />
                                            <path d="M2.336 8.89 10 14l11.715-7.029" />
                                            <path d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z" />
                                        </svg>
                                        <span className="text-base">My Parcels</span>
                                    </NavLink>
                                </li>



                                <li>
                                    <NavLink
                                        to="/dashboard/payment-history"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="3" fill="none" stroke="currentColor" className="size-7">
                                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
                                        </svg>
                                        <span className="text-base">Payment History</span>
                                    </NavLink>
                                </li>



                            </>
                        }



                        {/* Rider only routes */}

                        {
                            role === 'rider' && <>

                                <li>
                                    <NavLink
                                        to="/dashboard/assigned-deliveries"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="M12 22V12" /><path d="m16 17 2 2 4-4" /><path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" /><path d="M3.29 7 12 12l8.71-5" /><path d="m7.5 4.27 8.997 5.148" />
                                        </svg>
                                        <span className="text-base">Assigned Deliveries</span>
                                    </NavLink>
                                </li>




                                <li>
                                    <NavLink
                                        to="/dashboard/completed-deliveries"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="3" fill="none" stroke="currentColor" className="size-7">
                                            <path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" />
                                        </svg>
                                        <span className="text-base">Completed Deliveries</span>
                                    </NavLink>
                                </li>



                            </>
                        }






                        {/* Admin only routes */}

                        {
                            role === 'admin' &&
                            <>

                                <li>
                                    <NavLink
                                        to="/dashboard/all-parcels"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="m12 8 6-3-6-3v10" /><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" /><path d="m6.49 12.85 11.02 6.3" /><path d="M17.51 12.85 6.5 19.15" />
                                        </svg>
                                        <span className="text-base">All Parcels</span>
                                    </NavLink>
                                </li>




                                <li>
                                    <NavLink
                                        to="/dashboard/approve-riders"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="m18 14-1-3" /><path d="m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81" /><path d="M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5" /><circle cx="19" cy="17" r="3" /><circle cx="5" cy="17" r="3" />
                                        </svg>
                                        <span className="text-base">Approve Riders</span>
                                    </NavLink>
                                </li>




                                <li>
                                    <NavLink
                                        to="/dashboard/assign-riders"
                                        end
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="m19 16-3 3" /><path d="M2 21a8 8 0 0 1 12.664-6.5" /><path d="M22 19h-6l3 3" /><circle cx="10" cy="8" r="5" />
                                        </svg>
                                        <span className="text-base">Assign Riders</span>
                                    </NavLink>
                                </li>




                                <li>
                                    <NavLink
                                        to="/dashboard/users-management"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" />
                                        </svg>
                                        <span className="text-base">Users Management</span>
                                    </NavLink>
                                </li>

                            </>
                        }




                        {
                            role === 'user' && <>

                                <li>
                                    <NavLink
                                        to="/dashboard/parcels-tracking"
                                        onClick={closeDrawer}
                                        className={navLinkClass}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                            <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" /><circle cx="12" cy="8" r="2" /><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
                                        </svg>
                                        <span className="text-base">Parcels Tracking</span>
                                    </NavLink>
                                </li>


                            </>

                        }





                        <li>
                            <NavLink
                                to="/dashboard/settings"
                                onClick={closeDrawer}
                                className={navLinkClass}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-7">
                                    <path d="M20 7h-9" />
                                    <path d="M14 17H5" />
                                    <circle cx="17" cy="17" r="3" />
                                    <circle cx="7" cy="7" r="3" />
                                </svg>
                                <span className="text-base">Settings</span>
                            </NavLink>
                        </li>





                    </ul>



                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;