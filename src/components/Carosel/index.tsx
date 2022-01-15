import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
// import 'swiper/modules/navigation/navigation.scss'; // Navigation module
// import 'swiper/modules/pagination/pagination.scss'; // Pagination module

export default function Carosel(props: {
  perView?: number;
  spaceBetween?: number;
  swiperClass?: string;
  onIndexChange?: Function;
  data: Array<any>;
  renderChild(data: unknown, i: number): ReactNode;
}) {
  const {
    data,
    perView,
    spaceBetween,
    swiperClass,
    onIndexChange,
    renderChild,
  } = props;
  return (
    <Swiper
      className={swiperClass}
      onSlideChange={
        onIndexChange ?
          (params) => onIndexChange(params.activeIndex) :
          () => void 0
      }
      slidesPerView={perView || 1}
      spaceBetween={spaceBetween || 0}
    >
      {
        data.map((_data, i) => (
          <SwiperSlide key={i}>
            {renderChild(_data, i)}
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}