import React, { useState } from 'react';
import Carosel from '../Carosel';
import { CaroselItem } from '../../interface/CaroselType';
import styles from './Banner.module.scss';
import { Body1, Colors, Headline2 } from '@class101/ui';

export default function Banner(props: { data: Array<CaroselItem> }) {
  const [curIndex, setIndex] = useState(0);
  const onIndexChange = (index: number) => {
    setIndex(index);
  }

  function renderItem(data: CaroselItem, index: number) {
    return (
      <img src={data.img} alt="slide_img" />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.background_container} style={{ background: props.data[curIndex]?.bgColor || '#000' }} />
      <div className={styles.banner_wrap_relative_parent}>
        <div className={styles.banner_wrap}>
          <div>
            <Carosel
              swiperClass={styles.carosel_container}
              data={props.data}
              renderChild={renderItem}
              perView={1}
              autoplayDelay={6000}
              onIndexChange={onIndexChange}
            />
          </div>
          <div className={styles.banner_text_wrap}>
            <Headline2
              lg="Headline2"
              sm="Headline3"
              element="p"
              className={styles.banner_title}
              color={Colors.white}
              fontWeight={900}
            >
              {props.data[curIndex].title}
            </Headline2>
            <Body1
              lg="Body1"
              sm="Body2"
              element="p"
              className={styles.banner_sub_title}
              color={Colors.white}
              fontWeight="bold"
            >
              {props.data[curIndex].subtitle}
            </Body1>
          </div>
        </div>
      </div>
    </div>
  )
}