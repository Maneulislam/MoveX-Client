import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaBell, FaMapMarkerAlt, FaShieldAlt, FaSave, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaved, setIsSaved] = useState(false);
    const { user } = useAuth();
    const instanceAxios = useAxiosSecure();

    const { data: userData, refetch } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceAxios.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (userData || user) {
            reset({
                displayName: userData?.displayName || user?.displayName || '',
                email: userData?.email || user?.email || '',
                role: userData?.role || 'user',
                phone: userData?.phone || '',
                defaultAddress: userData?.defaultAddress || '',
                preferredZone: userData?.preferredZone || 'Dhaka North',
                deliveryNote: userData?.deliveryNote || '',
                emailNotifs: userData?.emailNotifs ?? true,
                smsNotifs: userData?.smsNotifs ?? true,
                promoNotifs: userData?.promoNotifs ?? false,
            });
        }
    }, [userData, user, reset]);

    const onSubmit = async (data) => {
        if (!data.currentPassword) delete data.currentPassword;
        if (!data.newPassword) delete data.newPassword;

        const res = await instanceAxios.patch(`/users/${user?.email}`, data);

        if (res.data.modifiedCount > 0 || res.data.matchedCount > 0 || res.data.upsertedCount > 0 || res.data.acknowledged) {
            refetch();
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Account Settings
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage your profile, delivery preferences, and notification triggers.
                        </p>
                    </div>
                    {isSaved && (
                        <div className="alert alert-success shadow-sm py-2 px-4 text-sm flex items-center gap-2 w-fit">
                            <FaCheckCircle className="w-4 h-4 text-success-content" />
                            <span>Settings updated successfully!</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    <div className="md:col-span-1">
                        <div className="bg-base-100 rounded-box p-2 shadow-sm border border-gray-200">
                            <nav className="flex md:flex-col gap-1 overflow-x-auto">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('profile')}
                                    className={`btn btn-ghost justify-start gap-3 flex-1 md:flex-initial whitespace-nowrap ${activeTab === 'profile' ? 'btn-active font-semibold bg-primary' : ''}`}
                                >
                                    <FaUser className="w-4 h-4" />
                                    Profile Details
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('delivery')}
                                    className={`btn btn-ghost justify-start gap-3 flex-1 md:flex-initial whitespace-nowrap ${activeTab === 'delivery' ? 'btn-active font-semibold bg-primary' : ''}`}
                                >
                                    <FaMapMarkerAlt className="w-4 h-4" />
                                    Delivery Setup
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('notifications')}
                                    className={`btn btn-ghost justify-start gap-3 flex-1 md:flex-initial whitespace-nowrap ${activeTab === 'notifications' ? 'btn-active font-semibold bg-primary' : ''}`}
                                >
                                    <FaBell className="w-4 h-4" />
                                    Notifications
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('security')}
                                    className={`btn btn-ghost justify-start gap-3 flex-1 md:flex-initial whitespace-nowrap ${activeTab === 'security' ? 'btn-active font-semibold bg-primary' : ''}`}
                                >
                                    <FaShieldAlt className="w-4 h-4" />
                                    Security
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-base-100 rounded-box p-6 shadow-sm border border-gray-200 space-y-6">

                            {/* Profile Details Tab */}
                            <div className={activeTab === 'profile' ? 'block space-y-6' : 'hidden'}>
                                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-3 flex items-center gap-2">
                                    <FaUser className="w-5 h-5 text-primary" />
                                    Personal Details
                                </h2>

                                <div className="flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                            <img
                                                src={userData?.photoURL || user?.photoURL || 'https://i.ibb.co/M8P5vQh/avatar.png'}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                Full Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                            {...register('displayName', { required: true })}
                                        />
                                        {errors.displayName?.type === 'required' && (
                                            <span className="text-red-500 text-xs">Full Name is required</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                Email Address
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            readOnly
                                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 bg-gray-200 cursor-not-allowed focus:outline-none"
                                            {...register('email')}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                Phone Number
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+8801XXXXXXXXX"
                                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                            {...register('phone')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Tab */}
                            <div className={activeTab === 'delivery' ? 'block space-y-6' : 'hidden'}>
                                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-3 flex items-center gap-2">
                                    <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                                    Default Delivery Preferences
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                Default Address
                                            </span>
                                        </label>
                                        <textarea
                                            placeholder="Street, building, flat number..."
                                            className="textarea textarea-bordered w-full h-24 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                            {...register('defaultAddress')}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                Primary Coverage Zone
                                            </span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                            {...register('preferredZone')}
                                        >
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Chattogram">Chattogram</option>
                                            <option value="Sylhet">Sylhet</option>
                                            <option value="Rangpur">Rangpur</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Rajshahi">Rajshahi</option>
                                            <option value="Barisal">Barisal</option>
                                            <option value="Mymensingh">Mymensingh</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                Default Delivery Instructions
                                            </span>
                                        </label>
                                        <textarea
                                            placeholder="Notes for rider (e.g. Call before arrival)"
                                            className="textarea textarea-bordered w-full h-24 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                            {...register('deliveryNote')}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications Tab */}
                            <div className={activeTab === 'notifications' ? 'block space-y-6' : 'hidden'}>
                                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-3 flex items-center gap-2">
                                    <FaBell className="w-5 h-5 text-primary" />
                                    Notification Channels
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">Email Status Updates</p>
                                            <p className="text-xs text-gray-500">Receive email receipts & tracking updates</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            {...register('emailNotifs')}
                                            className="toggle toggle-primary"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">SMS Delivery Alerts</p>
                                            <p className="text-xs text-gray-500">Get instant SMS when parcel is out for delivery</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            {...register('smsNotifs')}
                                            className="toggle toggle-primary"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">Promotional Offers</p>
                                            <p className="text-xs text-gray-500">Occasional discounts and feature updates</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            {...register('promoNotifs')}
                                            className="toggle toggle-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security Tab */}
                            <div className={activeTab === 'security' ? 'block space-y-6' : 'hidden'}>
                                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-3 flex items-center gap-2">
                                    <FaShieldAlt className="w-5 h-5 text-primary" />
                                    Security & Password
                                </h2>
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                Current Password
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                            {...register('currentPassword')}
                                        />
                                    </div>

                                    <div>
                                        <label className="label p-0 mb-1">
                                            <span className="label-text text-xs font-bold text-gray-700">
                                                New Password
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                            {...register('newPassword')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Action Buttons */}
                            <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                                <button type="button" onClick={() => reset()} className="btn btn-outline hover:bg-primary">
                                    Reset
                                </button>
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary text-black gap-2">
                                    {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : <FaSave className="w-4 h-4" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;