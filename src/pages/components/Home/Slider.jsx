import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import slide1 from "../../../assets/slide1.webp";
import slide2 from "../../../assets/slide2.jpg";
import Image from "../../../components/shared/Image";
import ArrowNext from "./ArrowNext";
import ArrowPrev from "./ArrowPrev";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="relative">
      <div className="custom-next">
        <ArrowNext />
      </div>
      <div className="custom-prev">
        <ArrowPrev />
      </div>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        // navigation={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
        }}
        loop={true} // Enable infinite loop
      >
        <SwiperSlide>
          <div className="relative">
            <div className="absolute !z-[100] top-0 left-0 h-full w-full flex justify-center items-center flex-col">
              <h1 className="text-4xl font-bold text-textLight">
                Capture Life's Moments with Shutter Academy
              </h1>
              <p className="w-[600px] mt-4 text-center text-textLight">
                Unleash your photography skills. Join Shutter Academy and master
                the art of capturing unforgettable moments. Enroll now and bring
                your passion to life!
              </p>
              <div className="flex justify-center">
                <Link
                  to={"/classes"}
                  className="px-8 py-3 mt-4 text-lg font-semibold rounded-lg bg-primary text-textDark"
                >
                  View All Classes
                </Link>
              </div>
            </div>
            <div className="absolute top-0 left-0 z-20 w-full h-full bg-gray-900 bg-opacity-70"></div>
            <Image
              className="w-full h-[600px] object-cover"
              src={slide1}
              alt="Slide 1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="absolute !z-[100] top-0 left-0 h-full w-full flex justify-center items-center flex-col">
              <h1 className="text-4xl font-bold text-textLight">
                Unleash Your Creativity at Shutter Academy
              </h1>
              <p className="w-[600px] mt-4 text-center text-textLight">
                Discover the world through the lens. Shutter Academy offers
                expert photography training to help you express your unique
                perspective. Enroll today and embark on a journey of visual
                storytelling!
              </p>
              <div className="flex justify-center">
                <Link
                  to={"/classes"}
                  className="px-8 py-3 mt-4 text-lg font-semibold rounded-lg bg-primary text-textDark"
                >
                  View All Classes
                </Link>
              </div>
            </div>
            <div className="absolute top-0 left-0 z-20 w-full h-full bg-gray-900 bg-opacity-70"></div>
            <Image
              className="w-full h-[600px] object-cover"
              src={slide2}
              alt="Slide 2"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
