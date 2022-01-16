import React, { Fragment, ReactNode, useRef, useState } from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import "swiper/css/autoplay";
import "./carosel.css";

import styles from './Carosel.module.scss';
import { CoverRatio } from '@class101/ui';

SwiperCore.use([Navigation, Autoplay]);

export default function Carosel(props: {
  perView?: number;
  spaceBetween?: number;
  swiperClass?: string;
  onIndexChange?: Function;
  useOutsideNavigation?: boolean;
  useInsideNavigation?: boolean;
  ratio?: CoverRatio;
  autoplayDelay?: number;
  data: Array<any>;
  renderChild(data: any, i: number): ReactNode;
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [curIndex, setCurrentIndex] = useState(0);

  const getCssTop = (ratio: CoverRatio): string => {
    switch (ratio) {
      case CoverRatio.RATIO_4X3:
        return '25%'
      case CoverRatio.RATIO_3X4:
        return '35%'
      case CoverRatio.RATIO_16X9:
        return '33%'
      default:
        break;
    }
    return '25%'
  }

  const {
    data,
    perView,
    ratio,
    spaceBetween,
    swiperClass,
    onIndexChange,
    autoplayDelay,
    useOutsideNavigation,
    useInsideNavigation,
    renderChild,
  } = props;

  return (
    <div className={styles.carosel_container}>
      {
        useOutsideNavigation &&
        <Fragment>
          <div
            ref={prevRef}
            className={styles.prev_btn}
            style={{
              top: ratio ? getCssTop(ratio) : '25%',
              visibility: curIndex > 0 ? 'visible' : 'hidden'
            }}
          />
          <div
            ref={nextRef}
            className={styles.next_btn}
            style={{
              top: ratio ? getCssTop(ratio) : '25%',
              visibility: (data.length - (perView || 1)) !== curIndex ? 'visible' : 'hidden'
            }}
          />
        </Fragment>
      }
      {
        useInsideNavigation &&
        <Fragment>
          <div
            ref={prevRef}
            className={styles.prev_inside_btn}
            style={{ opacity: curIndex > 0 ? 1 : 0.3 }}
          />
          <div
            ref={nextRef}
            className={styles.next_inside_btn}
            style={{ opacity: (data.length - (perView || 1)) !== curIndex ? 1 : 0.3 }}
          />
        </Fragment>
      }
      <Swiper
        onInit={(useOutsideNavigation || useInsideNavigation) ? (swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        } : () => void 0}
        pagination={useInsideNavigation ? {
          clickable: true,
          renderBullet: function (index, className) {
            return <span className={styles.bullet}>{index + 1}</span>;
          }
        } : {}}
        className={swiperClass}
        autoplay={autoplayDelay ? { delay: autoplayDelay } : false}
        onSlideChange={
          onIndexChange ?
            (params) => {
              onIndexChange(params.activeIndex)
              setCurrentIndex(params.activeIndex)
            } :
            (params) => setCurrentIndex(params.activeIndex)
        }
        slidesPerView={perView || 1}
        spaceBetween={spaceBetween || 0}
      >
        {
          data.map((_data: unknown, i: number) => (
            <SwiperSlide key={i}>
              {renderChild(_data, i)}
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}