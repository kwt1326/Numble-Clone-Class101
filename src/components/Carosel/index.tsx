import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from '@class101/ui';
import styles from './Carosel.module.scss';
import "swiper/css/bundle";

export default function Carosel(props: {
  perView?: number;
  swiperClass: string;
  data: Array<any>;
  onIndexChange: Function;
}) {
  const {
    data, perView,
    swiperClass,
    onIndexChange
  } = props;
  return (
    <Swiper
      className={swiperClass}
      onSlideChange={(params) => onIndexChange(params.activeIndex)}
      slidesPerView={perView || 1}
    >
      {
        data.map(item => (
          <SwiperSlide>
            <Card
              coverImage={item.img}
              coverImageAlt="slide_card_img"
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}