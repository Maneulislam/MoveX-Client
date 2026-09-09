import { useForm } from "react-hook-form";
import parcel from "../../../assets/parcel-icon.jpg"
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const BookParcel = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { user } = useAuth();

    const navigate = useNavigate();


    const instanceAxios = useAxiosSecure();

    const servicesPoints = useLoaderData();
    const duplicateRegions = servicesPoints.map((r) => r.region)
    const regions = [...new Set(duplicateRegions)]
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion")


    const districtsByRegion = region => {
        const regionDistricts = servicesPoints.filter(p => p.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }





    const handleParcelSend = data => {
        console.log(data);
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const isDocument = data.docType === "document";
        const parcelWeight = parseFloat(data.parcelWeight);

        // eslint-disable-next-line no-useless-assignment
        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        } else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;

                cost = minCharge + extraCharge;
            }
        }
        data.cost = cost;

        Swal.fire({
            title: "Confirm Parcel Send?",
            html: `Your <strong>${parcelWeight}</strong> kg ${isDocument ? "Document" : "Non-Document"} parcel will be shipped for a charge of <strong>${cost} </strong> taka.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment"
        }).then((result) => {
            if (result.isConfirmed)

                instanceAxios.post('/parcels', data)
                    .then(res => {

                        navigate('/dashboard/my-parcels')

                        console.log("After saving data", res.data);

                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel has Created. Please Pay.",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })

        });

    }



    return (
        <div className='card bg-white  mb-16'>

            <div className='px-40 py-20'>

                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left gap-3 sm:gap-5 mb-8 sm:mb-16 ">
                    <img className="w-40 h-20 object-contain" src={parcel} alt="" />
                    <h1 className='text-5xl font-extrabold '>Book A Parcel</h1>

                </div>
                <h6 className='text-2xl font-extrabold'>Enter your parcel details</h6>

                <div className="border-t-2 border-gray-200 my-8">

                </div>


                <form onSubmit={handleSubmit(handleParcelSend)}>

                    {/* Radio button */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-max">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="document"
                                defaultChecked
                                className="radio radio-success radio-sm border-2 checked:bg-white checked:border-green-600"
                                {...register("docType", { required: true })}
                            />
                            <span className="text-sm font-semibold text-slate-800">Document</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="not-document"
                                className="radio radio-success radio-sm border-2 checked:bg-white checked:border-green-600"
                                {...register("docType", { required: true })}
                            />
                            <span className="text-sm font-semibold text-slate-800">Non-Document</span>
                        </label>
                    </div>


                    {/*Parcel info: Parcel Name */}

                    <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 mt-8">

                        <div>
                            <label className="label p-0 mb-1">
                                <span className="label-text text-xs font-bold text-gray-700">
                                    Parcel Name
                                </span>
                            </label>

                            <input
                                type="text"
                                placeholder="Parcel Name"
                                className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"

                                {...register("parcelName", { required: true })}
                            />

                            {errors.parcelName?.type === 'required' && <span className="text-red-500">Parcel Name is required</span>}


                        </div>

                        <div>
                            <label className="label p-0 mb-1">
                                <span className="label-text text-xs font-bold text-gray-700">
                                    Parcel Weight (KG)
                                </span>
                            </label>

                            <input
                                type="number"
                                placeholder="Parcel Weight (KG)"
                                disabled={watch("docType") === "document"}
                                className={`input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none ${watch("docType") === "document"
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : ""
                                    }`}
                                {...register("parcelWeight", {
                                    required: watch("docType") === "not-document"
                                })}

                            />
                            {watch("docType") === "document" && (
                                <p className=" text-red-500">
                                    Weight is not required for documents
                                </p>
                            )}

                            {errors.parcelWeight?.type === 'required' && <span className="text-red-500">Parcel Weight is required</span>}


                        </div>

                    </div>


                    {/* Border */}

                    <div className="border-t-2 border-gray-200 my-8">

                    </div>


                    {/* Sender and Receiver */}


                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 mt-8">


                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-gray-800">Sender Details</h2>

                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Sender Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Sender Name"
                                    defaultValue={user.displayName}
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("senderName", { required: true })}
                                />
                                {errors.senderName?.type === 'required' && <span className="text-red-500 text-xs">Sender name is required</span>}
                            </div>


                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Sender Email
                                    </span>
                                </label>

                                <input
                                    type="email"
                                    placeholder="Sender Email"
                                    defaultValue={user.email}
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"

                                    {...register("senderEmail", { required: true })}
                                />

                                {errors.senderEmail?.type === 'required' && <span className="text-red-500">Email is required</span>}


                            </div>


                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("senderAddress", { required: true })}
                                />
                                {errors.senderAddress?.type === 'required' && <span className="text-red-500 text-xs">Address is required</span>}
                            </div>

                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Sender Contact No.
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Sender Phone No"
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("senderPhone", { required: true })}
                                />
                                {errors.senderPhone?.type === 'required' && <span className="text-red-500 text-xs">Sender Phone No is required</span>}
                            </div>



                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Your Region
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    defaultValue=""
                                    {...register("senderRegion", { required: true })}
                                >
                                    <option value="" disabled>Select your Region</option>

                                    {
                                        regions.map((r, index) => (
                                            <option key={index} value={r}>{r}</option>
                                        ))
                                    }


                                </select>
                                {errors.senderRegion?.type === 'required' && <span className="text-red-500 text-xs">Your Region is required</span>}
                            </div>


                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Your District
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    defaultValue=""
                                    {...register("senderDistrict", { required: true })}
                                >
                                    <option value="" disabled>Select your District</option>

                                    {
                                        districtsByRegion(senderRegion).map((d, index) => (
                                            <option key={index} value={d}>{d}</option>
                                        ))
                                    }



                                </select>
                                {errors.senderDistrict?.type === 'required' && <span className="text-red-500 text-xs">Your District is required</span>}
                            </div>

                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Pickup Instruction
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Pickup Instruction"
                                    className="textarea textarea-bordered w-full h-24 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("pickupInstruction")}
                                ></textarea>
                            </div>
                        </div>



                        {/* Receiver */}

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-gray-800">Receiver Details</h2>

                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Receiver Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("receiverName", { required: true })}
                                />
                                {errors.receiverName?.type === 'required' && <span className="text-red-500 text-xs">Receiver Name is required</span>}
                            </div>



                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Receiver Email
                                    </span>
                                </label>

                                <input
                                    type="email"
                                    placeholder="Receiver Email"
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"

                                    {...register("receiverEmail", { required: true })}
                                />

                                {errors.receiverEmail?.type === 'required' && <span className="text-red-500">Email is required</span>}


                            </div>


                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Receiver Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("receiverAddress", { required: true })}
                                />
                                {errors.receiverAddress?.type === 'required' && <span className="text-red-500 text-xs">Receiver Address is required</span>}
                            </div>

                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Receiver Contact No.
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Sender Contact No"
                                    className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("receiverPhone", { required: true })}
                                />
                                {errors.receiverPhone?.type === 'required' && <span className="text-red-500 text-xs">Receiver Contact No is required</span>}
                            </div>



                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Receiver Region
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    defaultValue=""
                                    {...register("receiverRegion", { required: true })}
                                >
                                    <option value="" disabled>Select Receiver Region</option>

                                    {
                                        regions.map((r, index) => (
                                            <option key={index} value={r}>{r}</option>
                                        ))
                                    }


                                </select>
                                {errors.senderRegion?.type === 'required' && <span className="text-red-500 text-xs">Receiver Region is required</span>}
                            </div>




                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Receiver District
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    defaultValue=""
                                    {...register("receiverDistrict", { required: true })}
                                >
                                    <option value="" disabled>Select Receiver District</option>

                                    {
                                        districtsByRegion(receiverRegion).map((d, index) => (
                                            <option key={index} value={d}>{d}</option>
                                        ))
                                    }


                                </select>
                                {errors.receiverDistrict?.type === 'required' && <span className="text-red-500 text-xs">Receiver District is required</span>}
                            </div>

                            <div>
                                <label className="label p-0 mb-1">
                                    <span className="label-text text-xs font-bold text-gray-700">
                                        Delivery Instruction
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Delivery Instruction"
                                    className="textarea textarea-bordered w-full h-24 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"
                                    {...register("deliveryInstruction")}
                                ></textarea>
                            </div>
                        </div>

                    </div>


                    <p className="pl-4 my-12"><li>PickUp Time: 4pm-7pm Approx.</li></p>


                    <button
                        type="submit"
                        className="btn btn-primary text-black w-full sm:w-auto px-6 sm:px-10 py-3 text-sm sm:text-base font-bold rounded-lg shadow-md hover:shadow-lg transition-all"

                    >
                        Proceed to Confirm Booking

                    </button>


                </form>






            </div>
        </div>
    );
};

export default BookParcel;