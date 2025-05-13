import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './MainBanner.css';

export default function MainBanner() {
    return (
        <section className="main-banner">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation
            >
                <SwiperSlide>
                    <div
                        className="banner-slide"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/banner1.png)` }}
                    ></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="banner-slide"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/banner2.jpg)` }}
                    ></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="banner-slide"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/banner3.png)` }}
                    ></div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}
