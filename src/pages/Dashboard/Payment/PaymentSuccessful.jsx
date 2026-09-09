import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaBox, FaArrowRight, FaHome, FaCopy } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";

const PaymentSuccessful = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});


    const sessionId = searchParams.get('session_id');
    const instanceAxios = useAxiosSecure();
    console.log(sessionId);

    useEffect(() => {
        if (sessionId) {
            instanceAxios.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)

                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, instanceAxios])


    const handleCopy = (text) => {
        if (text) {
            navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        }
    };


    // Direct jsPDF Receipt Generation
    const handleDownloadReceipt = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a5"
        });


        doc.setFillColor(34, 197, 94);
        doc.rect(0, 0, 148, 35, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("ZapShift - Payment Receipt", 14, 18);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Payment Confirmed & Order Processing", 14, 25);

        doc.setTextColor(30, 41, 59);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Order Details", 14, 48);

        doc.setFillColor(241, 245, 249);
        doc.roundedRect(14, 53, 120, 18, 3, 3, "F");
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("Tracking ID:", 18, 60);
        doc.setFont("courier", "bold");
        doc.setFontSize(11);
        doc.text(paymentInfo.trackingId || "N/A", 18, 66);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text("Transaction ID:", 14, 82);
        doc.setFont("courier", "normal");
        doc.text(paymentInfo.transactionId || "N/A", 60, 82);

        doc.setFont("helvetica", "normal");
        doc.text("Status:", 14, 92);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(34, 197, 94);
        doc.text("PAID", 60, 92);

        doc.setDrawColor(226, 232, 240);
        doc.line(14, 98, 134, 98);

        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text("Thank you for shipping with ZapShift!", 14, 110);

        doc.save(`ZapShift-Receipt-${paymentInfo.trackingId || "order"}.pdf`);
    };



    return (
        <div className="max-h-screen py-12 px-4 flex justify-center items-center">
            <div className="max-w-2xl w-full">

                <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">


                    <div className=" p-8 text-center flex flex-col items-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-success/10 flex items-center justify-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-success/20 flex items-center justify-center">
                                    <FaCheckCircle className="text-success text-6xl md:text-7xl" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold">Payment Successful!</h1>
                        <p className="text-base mt-2 max-w-md opacity-95">
                            Thank you for your payment. Your delivery order is now confirmed and being processed.
                        </p>
                    </div>

                    <div className="card-body p-6 space-y-6">


                        <div className="alert  border border-primary/20 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FaBox className="text-black text-2xl" />
                                <div>
                                    <span className="text-xs  block uppercase tracking-wider font-semibold">
                                        Tracking ID
                                    </span>
                                    <span className="font-mono font-bold text-lg text-black">
                                        {paymentInfo.trackingId || "Processing..."}
                                    </span>
                                </div>
                            </div>
                            {paymentInfo.trackingId && (
                                <button
                                    onClick={() => handleCopy(paymentInfo.trackingId)}
                                    className="btn btn-xs btn-outline btn-black hover:bg-primary gap-1"
                                >
                                    <FaCopy /> Copy
                                </button>
                            )}
                        </div>


                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-base-content/70">Transaction Details</h3>
                            <div className="overflow-x-auto rounded-lg border border-base-200">
                                <table className="table table-sm w-full">
                                    <tbody>
                                        <tr>
                                            <td className="text-base-content/70">Transaction ID</td>
                                            <td className="font-mono font-semibold text-right">
                                                {paymentInfo.transactionId || "Processing..."}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-base-content/70">Status</td>
                                            <td className="text-right">
                                                <span className="badge badge-success badge-sm text-white font-medium">
                                                    Paid
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Link to="/dashboard/my-parcels" className="btn btn-outline hover:btn-primary hover:text-black flex-1">
                                View My Parcels <FaArrowRight className="ml-1" />
                            </Link>
                            <button
                                onClick={handleDownloadReceipt}
                                className="btn btn-outline hover:btn-primary hover:text-black flex-1 gap-2"
                            >
                                <FaDownload /> Download Receipt
                            </button>
                            <Link to="/dashboard" className="btn btn-outline hover:btn-primary hover:text-black flex-1">
                                <FaHome className="ml-1" /> Dashboard
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentSuccessful;