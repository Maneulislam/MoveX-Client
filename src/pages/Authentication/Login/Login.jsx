import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const Login = () => {

    const [loginError, setLoginError] = useState("");
    const [googleError, setGoogleError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signInUser, signInWithGoogle } = useAuth();

    const instanceAxios = useAxiosSecure();

    const navigate = useNavigate();

    const location = useLocation()



    const handleLogin = data => {
        console.log(data);

        signInUser(data.email, data.password)
            .then(result => {
                console.log(result);
                navigate(location.state || '/dashboard')
            })

            .catch(error => {
                console.log(error);
                if (error.code === "auth/invalid-credential") {
                    setLoginError("Invalid email or password.");
                } else if (error.code === "auth/user-not-found") {
                    setLoginError("No account found with this email.");
                } else if (error.code === "auth/wrong-password") {
                    setLoginError("Incorrect password.");
                } else if (error.code === "auth/invalid-email") {
                    setLoginError("Please enter a valid email address.");
                } else if (error.code === "auth/user-disabled") {
                    setLoginError("This account has been disabled.");
                } else {
                    setLoginError(error.message || "Login failed. Please try again.");
                }
            })


    };

    const handleGoogleLogin = () => {

        signInWithGoogle()
            .then(result => {
                console.log("Google user:", result.user);
                console.log("Photo URL:", result.user.photoURL);

                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                };

                instanceAxios.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log("User created in database");
                        } else if (res.data.message === 'user already exists') {
                            console.log("User already exists");
                        }

                        navigate(location.state || '/dashboard');
                    })
                    .catch(error => {
                        console.log("Database error:", error);
                    });
            })
            .catch(error => {
                console.log("Google login error:", error);

                if (error.code === "auth/popup-closed-by-user") {
                    setGoogleError("Google login was cancelled.");
                } else if (error.code === "auth/popup-blocked") {
                    setGoogleError("Google login popup was blocked.");
                } else {
                    setGoogleError(
                        error.message || "Google login failed. Please try again."
                    );
                }
            });
    };



    return (
        <div >



            <div className="w-full max-w-[350px] mx-auto">


                <div className="mb-6">
                    <h2 className="text-2xl sm:text-[34px] font-extrabold text-black leading-tight">
                        Welcome Back
                    </h2>

                    <p className="text-sm  mt-1">
                        Login with ZapShift
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">

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

                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full h-9 min-h-9 rounded-md text-sm border-gray-300 focus:border-primary focus:border-2 focus:outline-none"

                            {...register("password", { required: true })}
                        />

                        {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}


                        {loginError && (
                            <div className="text-red-500 text-sm font-medium">
                                {loginError}
                            </div>
                        )}
                    </div>

                    <div className="pt-0">
                        <Link
                            to={'/forget-password'}
                            className="text-xs text-gray-500 underline font-semibold hover:text-gray-800"
                        >
                            Forget Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="btn w-full min-h-8 h-8 border-none rounded-md bg-primary hover:bg-[#a8d82f] text-black text-base font-extrabold shadow-none"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-3 text-xs text-gray-500">
                    Don't have any account?{" "}
                    <Link
                        state={location.state}
                        to="/register"
                        className="text-secondary text-sm font-extrabold hover:underline "
                    >
                        Register
                    </Link>
                </div>

                <div className="flex items-center gap-3 my-3">
                    <div className="flex-1 h-px bg-gray-200"></div>

                    <span className="text-xs text-gray-400">
                        Or
                    </span>

                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {googleError && (
                    <div className="text-red-500 text-sm font-medium mb-2">
                        {googleError}
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn w-full min-h-8 h-8 rounded-md bg-[#e9edf3] hover:bg-[#dfe4eb] border-none text-black shadow-none font-extrabold"
                >
                    <FcGoogle className="text-base" />
                    Login with Google
                </button>

            </div>



        </div>

    );
};

export default Login;