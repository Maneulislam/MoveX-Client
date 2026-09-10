
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'






const Brands = () => {
    return (

        <div className='max-w-9/12 mx-auto mb-28 '>

            <h4 className='text-3xl font-bold text-center mb-16'>We've helped thousands of sales teams</h4>

            <Swiper
                className='border-l-4 border-r-4 border-primary'
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={4}
                centeredSlides={true}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}


            >
                <SwiperSlide><img src={casio} alt="" /></SwiperSlide>
                <SwiperSlide><img src={amazon} alt="" /></SwiperSlide>
                <SwiperSlide><img src={moonstar} alt="" /></SwiperSlide>
                <SwiperSlide><img src={star} alt="" /></SwiperSlide>
                <SwiperSlide><img src={randstad} alt="" /></SwiperSlide>
                <SwiperSlide><img src={start_people} alt="" /></SwiperSlide>
                <SwiperSlide><img src={amazon_vector} alt="" /></SwiperSlide>



            </Swiper>
        </div>

    );
};

export default Brands;