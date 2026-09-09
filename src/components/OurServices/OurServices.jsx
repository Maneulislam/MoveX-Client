import ServiceImage from '../../assets/service.png';

const OurServices = () => {
    return (
        <div className="bg-secondary text-white rounded-2xl mb-28 p-4 sm:p-6 md:p-20">

            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl sm:text-4xl font-extrabold">Our Services</h3>
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-300 mt-4 sm:mt-7">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-10">

                <div className="card bg-base-100 hover:bg-[#cbe86b] w-full shadow-sm transition-colors duration-200">
                    <figure className="px-6 pt-6 sm:px-10 sm:pt-10">
                        <img
                            src={ServiceImage}
                            alt="Express & Standard Delivery"
                            className="rounded-xl object-cover" />
                    </figure>
                    <div className="card-body text-black items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Express & Standard Delivery</h2>
                        <p className="text-sm sm:text-base">We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>
                    </div>
                </div>

                <div className="card bg-base-100 hover:bg-[#cbe86b] w-full shadow-sm transition-colors duration-200">
                    <figure className="px-6 pt-6 sm:px-10 sm:pt-10">
                        <img
                            src={ServiceImage}
                            alt="Nationwide Delivery"
                            className="rounded-xl object-cover" />
                    </figure>
                    <div className="card-body text-black items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Nationwide Delivery</h2>
                        <p className="text-sm sm:text-base">We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.</p>
                    </div>
                </div>

                <div className="card bg-base-100 hover:bg-[#cbe86b] w-full shadow-sm transition-colors duration-200">
                    <figure className="px-6 pt-6 sm:px-10 sm:pt-10">
                        <img
                            src={ServiceImage}
                            alt="Fulfillment Solution"
                            className="rounded-xl object-cover" />
                    </figure>
                    <div className="card-body text-black items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Fulfillment Solution</h2>
                        <p className="text-sm sm:text-base">We also offer customized service with inventory management support, online order processing, packaging, and after sales support.</p>
                    </div>
                </div>

                <div className="card bg-base-100 hover:bg-[#cbe86b] w-full shadow-sm transition-colors duration-200">
                    <figure className="px-6 pt-6 sm:px-10 sm:pt-10">
                        <img
                            src={ServiceImage}
                            alt="Cash on Home Delivery"
                            className="rounded-xl object-cover" />
                    </figure>
                    <div className="card-body text-black items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Cash on Home Delivery</h2>
                        <p className="text-sm sm:text-base">100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.</p>
                    </div>
                </div>

                <div className="card bg-base-100 hover:bg-[#cbe86b] w-full shadow-sm transition-colors duration-200">
                    <figure className="px-6 pt-6 sm:px-10 sm:pt-10">
                        <img
                            src={ServiceImage}
                            alt="Corporate Service"
                            className="rounded-xl object-cover" />
                    </figure>
                    <div className="card-body text-black items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Corporate Service / Contract In Logistics</h2>
                        <p className="text-sm sm:text-base">Customized corporate services which includes warehouse and inventory management support.</p>
                    </div>
                </div>

                <div className="card bg-base-100 hover:bg-[#cbe86b] w-full shadow-sm transition-colors duration-200">
                    <figure className="px-6 pt-6 sm:px-10 sm:pt-10">
                        <img
                            src={ServiceImage}
                            alt="Parcel Return"
                            className="rounded-xl object-cover" />
                    </figure>
                    <div className="card-body text-black items-center text-center p-6">
                        <h2 className="card-title text-xl font-bold">Parcel Return</h2>
                        <p className="text-sm sm:text-base">Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OurServices;