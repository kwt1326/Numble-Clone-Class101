import React from 'react';
import { Card } from '@class101/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CommonClassDataType, TimeDealClassDataType } from '../interface/ClassDataType';
import Header from '../components/Header';
import Banner from '../components/Banner';
import {
  caroselTopEventData
} from '../constants/carosel_data';
import {
  classTimeDealData
} from '../constants/class_data';
import Menu from '../components/Menu';


function Main() {
  const renderTimeDealClassChildren = (data: Array<TimeDealClassDataType>): JSX.Element[] => {
    return data.map((item, i) => (
      <SwiperSlide>
        <Card
          title={item.title}
          coverImageSrcSet={item.img}
          coverImageAlt={`time_deal_thumbnail_${i}`}
        />
      </SwiperSlide>
    ))
  }

  return (
    <div>
      <Header />
      <Menu />
      <Banner data={caroselTopEventData} />
      <Swiper>
        {renderTimeDealClassChildren(classTimeDealData)}
      </Swiper>
    </div>
  )
}

export default Main