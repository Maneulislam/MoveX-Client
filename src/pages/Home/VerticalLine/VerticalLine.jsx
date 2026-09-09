import live_tracking from '../../../assets/live-tracking.png';
import safe_delivery from '../../../assets/safe-delivery.png';

const VerticalLine = () => {
    return (
        <div className="w-9/12 max-w-7xl mx-auto mb-28">

            <div className="border-t border-dashed border-gray-500 w-full mb-10 md:mb-14">

            </div>

            <div className="space-y-6 sm:space-y-10">

                <div className="card flex-col md:flex-row bg-base-100 shadow-sm p-6 sm:p-8 rounded-2xl items-center">
                    <figure className="shrink-0">
                        <img
                            className="w-28 sm:w-36 md:w-40 object-cover"
                            src={live_tracking}
                            alt="Live Parcel Tracking" />
                    </figure>

                    <div className="w-full md:w-auto my-4 md:my-0 border-t md:border-t-0 md:h-24 md:border-l border-dashed border-gray-400 md:mx-8 lg:mx-16"></div>

                    <div className="card-body p-0 text-center md:text-left">
                        <h2 className="card-title text-xl sm:text-2xl font-extrabold justify-center md:justify-start">Live Parcel Tracking</h2>
                        <p className="text-gray-500 text-sm sm:text-base">Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                    </div>
                </div>

                <div className="card flex-col md:flex-row bg-base-100 shadow-sm p-6 sm:p-8 rounded-2xl items-center">
                    <figure className="shrink-0">
                        <img
                            className="w-28 sm:w-36 md:w-40 object-cover"
                            src={safe_delivery}
                            alt="100% Safe Delivery" />
                    </figure>

                    <div className="w-full md:w-auto my-4 md:my-0 border-t md:border-t-0 md:h-24 md:border-l border-dashed border-gray-400 md:mx-8 lg:mx-16"></div>

                    <div className="card-body p-0 text-center md:text-left">
                        <h2 className="card-title text-xl sm:text-2xl font-extrabold justify-center md:justify-start">100% Safe Delivery</h2>
                        <p className="text-gray-500 text-sm sm:text-base">We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                    </div>
                </div>

                <div className="card flex-col md:flex-row bg-base-100 shadow-sm p-6 sm:p-8 rounded-2xl items-center">
                    <figure className="shrink-0">
                        <img
                            className="w-28 sm:w-36 md:w-40 object-cover"
                            src={safe_delivery}
                            alt="24/7 Call Center Support" />
                    </figure>

                    <div className="w-full md:w-auto my-4 md:my-0 border-t md:border-t-0 md:h-24 md:border-l border-dashed border-gray-400 md:mx-8 lg:mx-16"></div>

                    <div className="card-body p-0 text-center md:text-left">
                        <h2 className="card-title text-xl sm:text-2xl font-extrabold justify-center md:justify-start">24/7 Call Center Support</h2>
                        <p className="text-gray-500 text-sm sm:text-base">Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.</p>
                    </div>
                </div>

            </div>

            <div className="border-t border-dashed border-gray-500 w-full my-10 md:my-14"></div>

        </div>
    );
};

export default VerticalLine;