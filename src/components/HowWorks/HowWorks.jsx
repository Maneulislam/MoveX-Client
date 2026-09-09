import BookingImage from '../../assets/bookingIcon.png';

const HowWorks = () => {
    return (
        <div className='w-10/12 max-w-7xl mx-auto mb-28 px-4 sm:px-0'>

            <h3 className='text-3xl md:text-4xl font-extrabold mb-16 text-center '>How it Works</h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

                <div className="bg-base-100 w-full shadow-sm rounded-2xl border border-gray-100">
                    <figure className='pl-5 pt-5'>
                        <img
                            src={BookingImage}
                            alt="Booking" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Booking Pick & Drop</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>

                <div className="bg-base-100 w-full shadow-sm rounded-2xl border border-gray-100">
                    <figure className='pl-5 pt-5'>
                        <img
                            src={BookingImage}
                            alt="Booking" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Cash On Delivery</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>

                <div className="bg-base-100 w-full shadow-sm rounded-2xl border border-gray-100">
                    <figure className='pl-5 pt-5'>
                        <img
                            src={BookingImage}
                            alt="Booking" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Delivery Hub</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>

                <div className="bg-base-100 w-full shadow-sm rounded-2xl border border-gray-100">
                    <figure className='pl-5 pt-5'>
                        <img
                            src={BookingImage}
                            alt="Booking" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title"> SME & Corporate</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default HowWorks;