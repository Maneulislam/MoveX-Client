import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const ParcelTrack = () => {

    const { trackingId } = useParams();
    const publicAxios = useAxios();

    const { data: trackings = [] } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await publicAxios.get(`/trackings/${trackingId}/logs`);
            return res.data;
        }
    })

    console.log(trackings);


    return (
        <div className="mb-20">



            <div className="text-xl mb-10 ml-10">
                <span className="font-bold"> Tracking ID:</span> {trackings[0]?.trackingId || trackingId}
            </div>



            <ul className="timeline timeline-vertical">

                {
                    trackings.map(tracking => <li key={tracking._id} className="">
                        <div className="timeline-start">
                            {new Date(tracking.createdAt).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box text-lg">
                            {tracking.details}
                        </div>
                        <hr />
                    </li>

                    )
                }





            </ul>


        </div>
    );
};

export default ParcelTrack;