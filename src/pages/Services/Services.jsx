import { useLoaderData, Link } from "react-router";
import { FaTruckFast, FaGlobe, FaWarehouse, FaMoneyBillTransfer, FaHandshake, FaRotateLeft, FaArrowRight, FaBox, FaLocationDot, FaBoxesPacking } from 'react-icons/fa6';

const Services = () => {
    const services = useLoaderData() || [];

    const iconMap = [FaTruckFast, FaGlobe, FaWarehouse, FaMoneyBillTransfer, FaHandshake, FaRotateLeft];

    return (
        <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-20">


                <div className="text-center max-w-3xl mx-auto">

                    <h1 className="text-4xl font-extrabold text-base-content sm:text-5xl">
                        Seamless Shipping <span className="text-primary">Solutions</span>
                    </h1>
                    <p className="mt-4 text-lg text-base-content/70">
                        From express local deliveries to nationwide e-commerce fulfillment, MoveX keeps your products moving efficiently across Bangladesh.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {services.map((service, index) => {
                        const Icon = iconMap[index % iconMap.length] || FaBoxesPacking;

                        return (
                            <div
                                key={index}
                                className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between p-6 hover:bg-primary"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-secondary text-primary rounded-xl">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-base-content mb-2">{service.title}</h3>
                                    <p className="text-sm text-base-content/70 mb-6">{service.description}</p>
                                </div>

                                <div className="pt-4 border-t border-base-300">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                                    >
                                        Inquire about service <FaArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-base-200 rounded-3xl p-8 sm:p-12 border border-base-300 shadow-sm">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-base-content">How <span className="text-primary">MoveX</span> Works</h2>
                        <p className="mt-2 text-base-content/70">
                            A straightforward 4-step process to get your package from your hands to its final destination.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="relative text-center sm:text-left space-y-3">
                            <div className="flex items-center justify-center sm:justify-start gap-3">

                                <FaBox className="w-10 h-10 text-secondary" />
                            </div>
                            <h3 className="text-lg font-bold text-base-content">Book Parcel</h3>
                            <p className="text-sm text-base-content/70">Schedule a pickup online or via our mobile app in under 60 seconds.</p>
                        </div>

                        <div className="relative text-center sm:text-left space-y-3">
                            <div className="flex items-center justify-center sm:justify-start gap-3">

                                <FaBoxesPacking className="w-10 h-10 text-secondary" />
                            </div>
                            <h3 className="text-lg font-bold text-base-content">We Collect</h3>
                            <p className="text-sm text-base-content/70">Our rider arrives at your doorstep to securely package and collect your item.</p>
                        </div>

                        <div className="relative text-center sm:text-left space-y-3">
                            <div className="flex items-center justify-center sm:justify-start gap-3">

                                <FaLocationDot className="w-10 h-10 text-secondary" />
                            </div>
                            <h3 className="text-lg font-bold text-base-content">Track Live</h3>
                            <p className="text-sm text-base-content/70">Monitor your shipment journey step-by-step with 24/7 real-time tracking.</p>
                        </div>

                        <div className="relative text-center sm:text-left space-y-3">
                            <div className="flex items-center justify-center sm:justify-start gap-3">

                                <FaTruckFast className="w-10 h-10 text-secondary" />
                            </div>
                            <h3 className="text-lg font-bold text-base-content">Safe Delivery</h3>
                            <p className="text-sm text-base-content/70">Package is handed over to the recipient with digital signature verification.</p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Services;