import { use } from 'react';
import customer from '../../../assets/customer-top.png'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';




const Reviews = ({ reviewsPromise }) => {

    const reviews = use(reviewsPromise);
    console.log(reviews);

    return (
        <div className='max-w-9/12 mx-auto mb-28'>
            <div className='flex items-center justify-center'>
                <img src={customer} alt="" />
            </div>

            <div className='text-center max-w-2xl mx-auto my-8'>
                <h2 className='text-3xl font-bold mb-4'>What our customers are sayings</h2>
                <p className='text-gray-700 mb-20'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

            </div>


            <div>

                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}

                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper border-l-2 border-r-2 border-primary"
                >

                    {
                        reviews.map(singleReview => (
                            <SwiperSlide className='space-x-32' key={singleReview.id}>
                                <ReviewCard singleReview={singleReview}></ReviewCard>
                            </SwiperSlide>
                        ))
                    }


                </Swiper>

            </div>


        </div>
    );
};

export default Reviews;