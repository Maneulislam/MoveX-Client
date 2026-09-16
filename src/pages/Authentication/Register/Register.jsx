import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [googleError, setGoogleError] = useState("");


    const location = useLocation();


    const navigate = useNavigate();


    const { registerUser, signInWithGoogle, updateUserProfile } = useAuth();
    const instanceAxios = useAxiosSecure();



    const handleRegister = (data) => {

        const profileImage = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {


                const formData = new FormData();
                formData.append("image", profileImage);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.
                    VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {

                        const photoURL = res.data.data.url;


                        // Create user in Database

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        instanceAxios.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // console.log("User created in the database");
                                }
                            })



                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }


                        updateUserProfile(userProfile)
                    })

                    .then(() => {

                        navigate(location.state || "/dashboard");
                    })
                    .catch(error => console.log(error))


            })
            .catch((error) => {

                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message
                });

            });
    };



    const handleGoogleRegister = () => {
        console.log("Google Register");

        signInWithGoogle()
            .then(result => {


                // Create User in database

                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                }

                instanceAxios.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            // console.log("User created in the database from Social login");
                        }
                    })

                navigate(location.state || "/dashboard");
            })
            .catch(error => {
                console.log(error);
                if (error.code === "auth/popup-closed-by-user") {
                    setGoogleError("Google login was cancelled.");
                } else if (error.code === "auth/popup-blocked") {
                    setGoogleError("Google login popup was blocked.");
                } else {
                    setGoogleError(
                        error.message || "Google login failed. Please try again."
                    );
                }
            })


    };

    return (
        <div className="">



            <div className="w-full max-w-[350px] mx-auto">


                <div className="mb-4">
                    <h2 className="text-2xl sm:text-[34px] font-extrabold text-black leading-tight">
                        Create an Account
                    </h2>

                    <p className="text-sm  mt-1">
                        Register with MoveX
                    </p>
                </div>



                <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">


                    <div>
                        <label className="label p-0 mb-1">
                            <span className="label-text text-xs font-bold text-gray-700">
                                Upload Photo
                            </span>
                        </label>

                        <input
                            type="file"
                            className="file-input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"

                            {...register("photo", { required: true })}
                        />

                        {errors.photo?.type === 'required' && <span className="text-red-500">Photo is required</span>}

                    </div>



                    <div>
                        <label className="label p-0 mb-1">
                            <span className="label-text text-xs font-bold text-gray-700">
                                Name
                            </span>
                        </label>

                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"

                            {...register("name", { required: true })}
                        />

                        {errors.name?.type === 'required' && <span className="text-red-500">Name is required</span>}


                    </div>



                    <div>
                        <label className="label p-0 mb-1">
                            <span className="label-text text-xs font-bold text-gray-700">
                                Email
                            </span>
                        </label>

                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"

                            {...register("email", { required: true })}
                        />

                        {errors.email?.type === 'required' && <span className="text-red-500">Email is required</span>}


                    </div>



                    <div>
                        <label className="label p-0 mb-1">
                            <span className="label-text text-xs font-bold text-gray-700">
                                Password
                            </span>
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none pr-10"
                                {...register("password", { required: true })}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-base" />
                                ) : (
                                    <FaEye className="text-base" />
                                )}
                            </button>
                        </div>

                        {errors.password?.type === 'required' && (
                            <span className="text-red-500 text-xs">Password is required</span>
                        )}
                    </div>



                    <button
                        type="submit"
                        className="btn w-full min-h-8 h-8 border-none rounded-md bg-primary hover:bg-[#a8d82f] text-black text-base font-extrabold shadow-none mt-2"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-3 text-xs text-gray-500">
                    Already have an account?{" "}
                    <Link
                        state={location.state}
                        to="/login"
                        className="text-secondary text-sm font-extrabold underline "
                    >
                        Login
                    </Link>
                </div>

                <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-gray-200"></div>

                    <span className="text-xs text-gray-400">
                        Or
                    </span>

                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="btn w-full min-h-8 h-8 rounded-md bg-[#e9edf3] hover:bg-[#dfe4eb] border-none text-black shadow-none text-sm font-extrabold"
                >
                    <FcGoogle className="text-base" />
                    Register with Google
                </button>

                {googleError && (
                    <div className="text-red-500 text-sm font-medium mb-2">
                        {googleError}
                    </div>
                )}

            </div>



        </div>

    );
};

export default Register;