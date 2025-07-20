import React, { useContext } from "react";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MyContext } from "@/context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify"; // Add this import

const Banners = (props) => {
  const context = useContext(MyContext);

  console.log(props)

  return (
    <>
      <div className="bannerAds pt-3 pb-3">
        {context?.windowWidth > 992 ? (
          <Swiper
            slidesPerView={4}
            spaceBetween={0}
            navigation={true}
            slidesPerGroup={props?.col}
            modules={[Navigation]}
            className="bannerSection pt-3"
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              750: {
                slidesPerView: props?.col,
                spaceBetween: 10,
              },
            }}
          >
            {props?.data?.length !== 0 &&
              props?.data?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className={`col_`}>
                      {item?.subCatId !== null ? (
                        <Link
                          href={`/category/subCat/${item?.subCatId}`}
                          className="box"
                        >
                          <Image
                            src={item?.images[0]}
                            className="w-100 transition"
                            alt="banner img"
                            layout="responsive"
                            width={0}
                            height={0}
                            priority="true"
                          />
                        </Link>
                      ) : (
                        <Link
                          href={`/category/${slugify(item?.catName || "", { lower: true, strict: true })}`}
                          className="box"
                        >
                          <Image
                            src={item?.images[0]}
                            className="w-100 transition"
                            alt="banner img"
                            layout="responsive"
                            width={0}
                            height={0}
                            priority="true"
                          />
                        </Link>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        ) : (
          <div
            className="bannerSection pt-3"
            style={{ gridTemplateColumns: `repeat(${props?.col},1fr)` }}
          >
            {props?.data?.length !== 0 &&
              props?.data?.map((item, index) => {
                return (
                  <div key={index} className={`col_`}>
                      {item?.subCatId !== null ? (
                        <Link
                          href={`/category/subCat/${item?.subCatId}`}
                          className="box"
                        >
                          <Image 
                            src={item?.images[0]}
                            className="w-100 transition"
                            alt="banner img"
                            layout="responsive"
                            width={0}
                            height={0}
                            priority="true"
                          />
                        </Link>
                      ) : (
                        <Link
                          href={`/category/${slugify(item?.catName || "", { lower: true, strict: true })}`}
                          className="box"
                        >
                          <Image
                            src={item?.images[0]}
                            className="w-100 transition"
                            alt="banner img"
                            layout="responsive"
                            width={0}
                            height={0}
                            priority="true"
                          />
                        </Link>
                      )}
                    </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Banners;
