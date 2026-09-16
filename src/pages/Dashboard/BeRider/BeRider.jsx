import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";
import riderImage from '../../../assets/agent-pending.png'
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeRider = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { user } = useAuth();
    const navigate = useNavigate();
    const instanceAxios = useAxiosSecure();

    const servicesPoints = useLoaderData() || [];
    const duplicateRegions = servicesPoints.map((r) => r.region);
    const regions = [...new Set(duplicateRegions)];
    const selectedRegion = watch("region");

    const districtsByRegion = (region) => {
        const regionDistricts = servicesPoints.filter((p) => p.region === region);
        return regionDistricts.map((d) => d.district);
    };


    const handleRiderApplication = (data) => {

        console.log(data);

        instanceAxios.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {

                    navigate('/dashboard');

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application Submitted Successfully!",
                        showConfirmButton: false,
                        timer: 2500
                    });

                }
            })



    };



    return (
        <div className="max-w-6xl mx-auto p-6 px-6 md:p-10 md:px-20 mb-20">

            <div className="max-w-lg">
                <h1 className="text-3xl md:text-4xl font-extrabold ">Be a Rider</h1>
                <p className="text-gray-500 mt-5 text-sm md:text-base ">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.  From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <form onSubmit={handleSubmit(handleRiderApplication)}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                    {/* Form Fields */}
                    <div className="lg:col-span-6 space-y-4">
                        <h2 className="text-xl font-extrabold mb-6">Tell us about yourself</h2>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Your Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                defaultValue={user?.displayName || ""}
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Driving License Number
                            </label>
                            <input
                                type="text"
                                placeholder="Driving License Number"
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("drivingLicense", { required: "Driving license is required" })}
                            />
                            {errors.drivingLicense && <span className="text-red-500 text-xs mt-1 block">{errors.drivingLicense.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Your Email
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                defaultValue={user?.email || ""}
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Your Region
                            </label>
                            <select
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                defaultValue=""
                                {...register("region", { required: "Region is required" })}
                            >
                                <option value="" disabled>Select your Region</option>
                                {regions.map((r, index) => (
                                    <option key={index} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.region && <span className="text-red-500 text-xs mt-1 block">{errors.region.message}</span>}
                        </div>



                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Your District
                            </label>
                            <select
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                defaultValue=""
                                {...register("district", { required: "District is required" })}
                            >
                                <option value="" disabled>Select your District</option>
                                {districtsByRegion(selectedRegion).map((d, index) => (
                                    <option key={index} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.district && <span className="text-red-500 text-xs mt-1 block">{errors.district.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                NID No
                            </label>
                            <input
                                type="text"
                                placeholder="NID"
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("nid", { required: "NID is required" })}
                            />
                            {errors.nid && <span className="text-red-500 text-xs mt-1 block">{errors.nid.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("phone", { required: "Phone number is required" })}
                            />
                            {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Bike Brand Model and Year
                            </label>
                            <input
                                type="text"
                                placeholder="Bike Brand Model and Year"
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("bikeModel", { required: "Bike model details are required" })}
                            />
                            {errors.bikeModel && <span className="text-red-500 text-xs mt-1 block">{errors.bikeModel.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Bike Registration Number
                            </label>
                            <input
                                type="text"
                                placeholder="Bike Registration Number"
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("bikeRegistration", { required: "Registration number is required" })}
                            />
                            {errors.bikeRegistration && <span className="text-red-500 text-xs mt-1 block">{errors.bikeRegistration.message}</span>}
                        </div>


                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                Tell Us About Yourself
                            </label>
                            <input
                                type="text"
                                placeholder="Tell Us About Yourself"
                                className="w-full h-11 px-3.5 text-sm rounded-md border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200"
                                {...register("aboutYourself")}
                            />
                        </div>


                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-[#c0e768] hover:bg-[#b0dc52] text-gray-900 font-bold py-3 px-6 rounded-md shadow-sm transition-colors duration-200 text-sm cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Right side image */}
                    <div className="lg:col-span-6 flex justify-center items-center sticky top-8">
                        <img
                            src={riderImage}
                            alt="Rider Image"
                            className="w-full max-w-md object-contain"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BeRider;