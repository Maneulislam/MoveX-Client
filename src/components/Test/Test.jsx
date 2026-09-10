import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'; // Adjust path to your AuthProvider

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch((error) => console.error('Logout failed:', error));
    };

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
            {/* Navbar Start - Logo */}
            <div className="navbar-start">
                <Link to="/" className="text-xl font-bold tracking-wide">
                    Zap<span className="text-primary">Shift</span>
                </Link>
            </div>

            {/* Navbar Center - Navigation Links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium gap-2">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/coverage">Coverage Map</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                </ul>
            </div>

            {/* Navbar End - Auth Controls */}
            <div className="navbar-end">
                {user ? (
                    /* Logged In State: User Dropdown */
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={
                                        user?.photoURL ||
                                        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                    }
                                    alt={user?.displayName || 'User Profile'}
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow-lg bg-base-100 rounded-box w-64 space-y-3"
                        >
                            {/* User Info Header */}
                            <li className="flex flex-col items-center gap-1 border-b pb-3 pointer-events-none">
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img
                                            src={
                                                user?.photoURL ||
                                                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                            }
                                            alt="User Avatar"
                                        />
                                    </div>
                                </div>
                                <p className="font-bold text-base text-center mt-1">
                                    {user?.displayName || 'User Name'}
                                </p>
                                <p className="text-xs text-base-content/70 text-center break-all">
                                    {user?.email || 'user@example.com'}
                                </p>
                            </li>

                            {/* Navigation Action Buttons */}
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="btn btn-primary btn-sm text-white w-full text-center"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="btn btn-outline btn-error btn-sm w-full text-center"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    /* Logged Out State: Login Button */
                    <Link to="/login" className="btn btn-primary btn-sm px-5">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;