import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaLocationDot, FaPaperPlane, FaClock, FaComments } from 'react-icons/fa6';

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        reset();
    };

    return (
        <div className="bg-base-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-base-content sm:text-5xl">
                        Get in <span className="text-primary">Touch</span>
                    </h1>
                    <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
                        Have questions about parcel delivery, tracking, or merchant partnerships? We're here to help you every step of the way.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Info Cards */}
                    <div className="space-y-6">
                        <div className="card bg-base-200 border border-base-300 shadow-sm p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary text-white rounded-xl">
                                    <FaPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-base-content">Phone Support</h3>
                                    <p className="text-sm text-base-content/70">+880 1791-106969</p>
                                    <p className="text-xs text-base-content/50 mt-1">Mon - Sat (9:00 AM - 8:00 PM)</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 border border-base-300 shadow-sm p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary text-white rounded-xl">
                                    <FaEnvelope className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-base-content">Email Us</h3>
                                    <p className="text-sm text-base-content/70">maneulislam512@gmail.com</p>
                                    <p className="text-xs text-base-content/50 mt-1">We usually respond within 2 hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 border border-base-300 shadow-sm p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary text-white rounded-xl">
                                    <FaLocationDot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-base-content">Headquarters</h3>
                                    <p className="text-sm text-base-content/70">Dhaka, Bangladesh</p>
                                    <p className="text-xs text-base-content/50 mt-1">Central Logistics Hub</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-secondary text-white-content p-6 shadow-md">
                            <div className="flex items-start gap-4">
                                <FaClock className="w-6 h-6 shrink-0 mt-1 text-white" />
                                <div>
                                    <h4 className="font-bold text-lg text-white">24/7 Parcel Tracking</h4>
                                    <p className="text-sm opacity-90 mt-1 text-white">
                                        Need instant updates on your parcel status? Track your shipment anytime using your tracking ID from the dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-200 border border-base-300 shadow-md p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <FaComments className="text-secondary w-6 h-6" />
                                <h2 className="text-2xl font-bold text-base-content">Send Us a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Your Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className={`input input-bordered w-full bg-base-100 focus:outline-none focus:border-white ${errors.name ? 'input-error' : ''
                                                }`}
                                            {...register('name', { required: 'Name is required' })}
                                        />
                                        {errors.name && (
                                            <span className="text-xs text-error mt-1">{errors.name.message}</span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Email Address</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className={`input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary ${errors.email ? 'input-error' : ''
                                                }`}
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                        />
                                        {errors.email && (
                                            <span className="text-xs text-error mt-1">{errors.email.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Phone Number</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                                            {...register('phone')}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Subject</span>
                                        </label>
                                        <select
                                            className={`select select-bordered w-full bg-base-100 focus:outline-none focus:border-primary ${errors.subject ? 'select-error' : ''
                                                }`}
                                            {...register('subject', { required: 'Please select an inquiry type' })}
                                        >
                                            <option value="" disabled>Select Inquiry Type</option>
                                            <option value="tracking">Parcel Tracking Inquiry</option>
                                            <option value="delivery">Delivery Issues</option>
                                            <option value="merchant">Merchant Partnership</option>
                                            <option value="general">General Support</option>
                                        </select>
                                        {errors.subject && (
                                            <span className="text-xs text-error mt-1">{errors.subject.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Tracking ID (Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tracking ID"
                                        className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                                        {...register('trackingId')}
                                    />
                                </div>

                                <div className="form-control ">
                                    <label className="label mr-5">
                                        <span className="label-text font-medium">Your Message</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered h-32 bg-base-100 focus:outline-none focus:border-primary ${errors.message ? 'textarea-error' : ''
                                            }`}
                                        placeholder="Tell us how we can help..."
                                        {...register('message', { required: 'Message is required' })}
                                    ></textarea>
                                    {errors.message && (
                                        <span className="text-xs text-error mt-1">{errors.message.message}</span>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-secondary w-full sm:w-auto px-8 gap-2"
                                    >
                                        <FaPaperPlane className="w-4 h-4" /> Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;