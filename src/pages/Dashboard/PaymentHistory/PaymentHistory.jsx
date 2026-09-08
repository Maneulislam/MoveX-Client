import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {

    const { user } = useAuth();
    const instanceAxios = useAxiosSecure();


    const { data: payments = [] } = useQuery({
        queryKey: ['/payments', user.email],
        queryFn: async () => {
            const res = await instanceAxios.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })





    return (
        <div>


            {/* Total */}
            <div className="card card-side bg-base-300 shadow-sm w-60 px-5 m-6">
                <figure>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-land-plot-icon lucide-land-plot"
                    >
                        <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" />
                    </svg>
                </figure>
                <div className="card-body flex-1 items-center">
                    <h2 className="text-base font-bold">Total Payments</h2>
                    <p className="text-3xl font-bold">{payments.length}</p>
                </div>
            </div>



            {/* Table */}
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra w-full border-collapse border border-base-300">
                    <thead>
                        <tr className="bg-base-200 text-center align-middle border-b border-base-300">
                            <th className="align-middle text-center border-r border-base-300">#</th>
                            <th className="align-middle text-center border-r border-base-300">Amount</th>

                            <th className="align-middle text-center border-r border-base-300">Transaction ID</th>
                            <th className="align-middle text-center border-r border-base-300">Tracking ID</th>
                            <th className="align-middle text-center border-r border-base-300">Payment Time</th>


                        </tr>
                    </thead>

                    <tbody>
                        {
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="text-center align-middle border-b border-base-300">
                                    <th className="align-middle text-center border-r border-base-300">{index + 1}</th>
                                    <td className="align-middle border-r border-base-300">${payment.amount}</td>





                                    <td className="align-middle border-r border-base-300">{payment.transactionId}</td>

                                    <td className="align-middle border-r border-base-300">{payment.trackingId}</td>



                                    <td className="align-middle border-r border-base-300">
                                        {new Date(payment.paidAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>



                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;