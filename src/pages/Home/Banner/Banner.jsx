import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'
import { Link } from "react-router";

const Banner = () => {
    return (
        <Carousel className="mb-28 mt-14"
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}

        >
            <div className="relative">
                <img src={bannerImg1} />


                <div className="flex items-center absolute bottom-16 left-24">
                    <Link to={'/dashboard/parcels-tracking'} className="btn bg-primary">Track Your Parcel</Link>
                    <Link to={'/dashboard/be-rider'} className="btn ml-7">Be A Rider</Link>

                </div>

            </div>


            <div className="relative">
                <img src={bannerImg2} />


                <div className="flex items-center absolute bottom-16 left-24">
                    <Link to={'/dashboard/parcels-tracking'} className="btn bg-primary">Track Your Parcel</Link>
                    <Link to={'/dashboard/be-rider'} className="btn ml-7">Be A Rider</Link>

                </div>

            </div>


            <div className="relative">
                <img src={bannerImg3} />



                <div className="flex items-center absolute bottom-16 left-24">
                    <Link to={'/dashboard/parcels-tracking'} className="btn bg-primary">Track Your Parcel</Link>
                    <Link to={'/dashboard/be-rider'} className="btn ml-7">Be A Rider</Link>

                </div>

            </div>
        </Carousel>
    );
};

export default Banner;