import { useNavigate } from "react-router";
import {
    FaTimesCircle,
    FaCreditCard,
    FaHome,
    FaRedo,
    FaInfoCircle
} from "react-icons/fa";

const PaymentCancelled = () => {


    const navigate = useNavigate();

    return (
        <div className="max-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl">

                <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden">
                    <div className="card-body p-6 md:p-10">

                        <div className="text-center">

                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-error/10 flex items-center justify-center">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-error/20 flex items-center justify-center">
                                        <FaTimesCircle className="text-error text-6xl md:text-7xl" />
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold">
                                Payment Cancelled
                            </h1>

                            <p className="text-base-content/60 max-w-xl mx-auto mt-4 leading-7">
                                Your payment was cancelled and no payment has been completed.
                                Your parcel order has not been confirmed yet.
                            </p>



                        </div>

                        <div className="divider my-4"></div>

                        <div className="rounded-2xl border border-warning/20 bg-warning/5 p-5 md:p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
                                    <FaInfoCircle className="text-warning text-2xl" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-lg">
                                        What happened?
                                    </h2>

                                    <p className="text-sm text-base-content/60 mt-2 leading-6">
                                        The payment process was cancelled before completion.
                                        You can return to your parcel page and try the payment again.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">

                            <button
                                onClick={() => navigate(-1)}
                                className="btn bg-primary text-black btn-lg gap-2"
                            >
                                <FaRedo />
                                Try Payment Again
                            </button>

                            <button
                                onClick={() => navigate("/dashboard")}
                                className="btn btn-outline bg-base-100 hover:bg-primary btn-lg gap-2"
                            >
                                <FaHome />
                                Go to Dashboard
                            </button>

                        </div>

                        <div className="text-center mt-7">
                            <p className="text-xs text-base-content/40 flex items-center justify-center gap-2">
                                <FaCreditCard />
                                No payment was completed for this transaction.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );


};

export default PaymentCancelled;
