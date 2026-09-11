import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";


const NavBar = () => {


    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
        navigate('/login')
            .then()
            .catch(error => {
                console.log(error);
            })
    }


    const navLinkStyle = ({ isActive }) =>
        isActive
            ? "bg-primary rounded-2xl"
            : "";

    const links = [
        <li key="services"><NavLink to={'/services'} className={navLinkStyle}>Services</NavLink></li>,
        <li key="coverage"><NavLink to={'/coverage'} className={navLinkStyle}>Coverage</NavLink></li>,
        <li key="pricing"><NavLink to={'/pricing'} className={navLinkStyle}>Pricing</NavLink></li>,
        <li key="about-us"><NavLink to={'/about-us'} className={navLinkStyle}>About Us</NavLink></li>,

    ]

    return (

        <div className=" bg-base-100 shadow-sm px-6  mb-14">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost pl-0 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-24 p-2 shadow space-y-2"
                        >
                            {links}
                        </ul>
                    </div>

                    <Logo></Logo>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-3">
                        {links}
                    </ul>
                </div>






                <div className="navbar-end gap-2 md:gap-3">


                    {
                        user ? <>


                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="w-12 h-12 ring ring-[#632EE3] rounded-full overflow-hidden cursor-pointer flex items-center justify-center"
                                >
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user?.displayName || "User"}
                                            className="w-12 h-12 rounded-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                                e.currentTarget.nextElementSibling.classList.remove("hidden");
                                                e.currentTarget.nextElementSibling.classList.add("flex");
                                            }}
                                        />
                                    ) : null}

                                    <div
                                        className={`w-12 h-12 rounded-full bg-[#c93612] items-center justify-center ${user?.photoURL ? "hidden" : "flex"
                                            }`}
                                    >
                                        <span className="text-white text-2xl font-normal">
                                            {user?.displayName?.trim()?.charAt(0)?.toUpperCase() || "U"}
                                        </span>
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-100 p-4 shadow-lg bg-base-100 rounded-box w-64 space-y-3"
                                >
                                    <li className="flex flex-col items-center border-b border-dashed border-gray-300 pb-3 pointer-events-none">
                                        <div className="avatar">
                                            <div className="w-14 h-14 rounded-full ring ring-[#632EE3] overflow-hidden">
                                                {user?.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user?.displayName || "User Avatar"}
                                                        className="w-14 h-14 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-full bg-[#c93612] flex items-center justify-center">
                                                        <span className="text-white text-2xl font-normal">
                                                            {user?.displayName?.trim()?.charAt(0)?.toUpperCase() || "U"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="font-bold text-base text-center mt-1">
                                            {user?.displayName}
                                        </p>
                                        <p className="text-xs text-base-content/70 text-center break-all ">
                                            {user?.email}
                                        </p>
                                    </li>

                                    <li className="p-0 hover:bg-transparent">
                                        <Link
                                            to="/dashboard"
                                            onClick={() => document.activeElement?.blur()}
                                            className="btn btn-outline text-base border-2 border-primary hover:btn-primary btn-sm text-black w-full flex justify-center items-center "
                                        >
                                            Dashboard <FaArrowRight />

                                        </Link>
                                    </li>

                                    <li className="p-0 hover:bg-transparent">
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-outline border-2 text-base btn-error btn-sm w-full flex justify-center items-center "
                                        >
                                            <FiLogOut />  Logout

                                        </button>
                                    </li>
                                </ul>
                            </div>

                        </>


                            :

                            <>
                                <Link
                                    to="/login"
                                    className="hover:bg-primary flex justify-center items-center gap-1 btn btn-outline rounded-full"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-circle-user"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="10" r="3" />
                                        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                                    </svg>
                                    <h5 className="text-xs font-bold">LOGIN</h5>
                                </Link>
                            </>

                    }
                </div>



            </div>
        </div >
    );
};

export default NavBar;