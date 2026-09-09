import location from '../../../assets/location-merchant.png'
import merchant from '../../../assets/be-a-merchant-bg.png'

const CustomerSatisfaction = () => {
    return (
        <div>
            <div className="hero bg-secondary rounded-2xl w-full max-w-11/12 lg:max-w-9/12 mx-auto mb-28 relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <img
                        src={merchant}
                        alt=""

                    />
                </div>

                <div className="hero-content flex-col lg:flex-row-reverse p-4 sm:p-7 sm:pl-10 lg:pl-14 relative z-10">
                    <img
                        alt="Tailwind CSS hero component"
                        src={location}
                        className="w-full max-w-xs sm:max-w-sm object-contain"
                    />
                    <div className="p-2 sm:p-7 text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                            Merchant and Customer Satisfaction is Our First Priority
                        </h1>
                        <p className="py-4 sm:py-6 text-sm sm:text-base text-gray-300">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-0 sm:space-x-6">
                            <button className="btn btn-primary text-black rounded-3xl w-full sm:w-auto">
                                Become a Merchant
                            </button>
                            <button className="btn bg-secondary text-primary rounded-3xl w-full sm:w-auto">
                                Earn with ZapShift Courier
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomerSatisfaction;