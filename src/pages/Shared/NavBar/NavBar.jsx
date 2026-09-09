import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {


    const { user, logOut } = useAuth();


    const handleLogout = () => {
        logOut()
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
        <li key="send-parcel"><NavLink to={'/send-parcel'} className={navLinkStyle}>Send Parcel</NavLink></li>,
        <li key="about-us"><NavLink to={'/about-us'} className={navLinkStyle}>About Us</NavLink></li>,

    ]

    return (

        <div className=" bg-base-100 shadow-sm px-6  mb-14">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost pl-0 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
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
                        user ? <a onClick={handleLogout} className="btn">Sign Out</a> :
                            <Link to={'/login'} className="btn">Sign In</Link>
                    }
                    <Link to={'/rider'} className="btn bg-primary md:btn-md sm:inline-flex hidden ">Be a rider</Link>
                    <a className="text-4xl bg-primary rounded-4xl"><BsArrowUpRightCircleFill />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;