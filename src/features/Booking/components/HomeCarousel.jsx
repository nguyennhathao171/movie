import { Carousel } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const HomeCarousel = () => {
  const banners = useSelector((state) => {
    return state.booking.banners;
  });
  return (
    <div>
      <Carousel>
        {banners.map((item) => {
          return (
            <div key={item.maBanner}>
              <img
                alt={item.maPhim}
                src={item.hinhAnh}
                className="w-full h-100 object-cover"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
