import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';
import { useRef } from 'react';

const Coverage = () => {

    const position = [23.6850, 90.3563]

    const servicePoints = useLoaderData();

    const mapRef = useRef(null);


    const handleSearch = (event) => {

        event.preventDefault();

        const location = event.target.location.value;

        const district = servicePoints.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];

            mapRef.current.flyTo(coord, 12)
        }


    }


    return (
        <div className='card bg-white  p-16 mb-16' >

            <div className='space-y-14'>
                <h2 className='text-5xl font-bold'>We are available in 64 districts</h2>

                <form onSubmit={handleSearch} className="w-full flex p-2">
                    <div className="w-full max-w-md">
                        <label className="input bg-gray-100 rounded-3xl relative flex items-center w-full pr-24 overflow-hidden focus-within:outline-none">
                            <svg
                                className="h-5 w-5 opacity-60 ml-1 flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="8"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                />
                                <path
                                    d="m21 21-4.3-4.3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <input
                                className="bg-transparent grow border-none focus:ring-0 text-sm md:text-base px-2 py-2 outline-none"
                                name='location'
                                type="search"
                                placeholder="Search here"
                                required
                            />

                            <button

                                type="submit"
                                className="btn rounded-full bg-primary text-black border-none absolute right-1 top-1 bottom-1 px-5 min-h-0 h-auto"
                            >
                                Search
                            </button>
                        </label>
                    </div>
                </form>

            </div>


            <div className="border-t border border-gray-200 w-full my-6 md:my-8"></div>



            <div>
                <h2 className='text-2xl font-bold mb-6 md:mb-10'>We deliver almost all over Bangladesh</h2>
            </div>



            <div>

                <MapContainer center={position} zoom={8} scrollWheelZoom={false}
                    className='h-[500px]'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        servicePoints.map((point, index) => (
                            <Marker key={index} position={[point.latitude, point.longitude]}>

                                <Popup>
                                    District: <strong>{point.district}</strong> <br /> Covered area: {point.covered_area.join(', ')}.
                                </Popup>

                            </Marker>
                        ))
                    }

                </MapContainer>

            </div>


        </div>
    );
};

export default Coverage;