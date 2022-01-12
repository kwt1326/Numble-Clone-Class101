import React, { useState } from 'react';
import Carosel from '../Carosel';
import { CaroselItem } from '../../interface/CaroselType';
import styles from './Banner.module.scss';
import { Colors, Headline2, Subtitle1, Subtitle2 } from '@class101/ui';

export default function Banner(props: { data: Array<CaroselItem> }) {
  const [curIndex, setIndex] = useState(0);
  const onIndexChange = (index: number) => {
    setIndex(index);
  }

  return (
    <div className={styles.container} style={{ background: props.data[curIndex]?.bgColor || 'white' }}>
      <div>
        <Carosel
          swiperClass={styles.carosel_container}
          data={props.data}
          perView={1}
          onIndexChange={onIndexChange}
        />
      </div>
      <div className={styles.banner_text_wrap}>
        <Headline2 element="p" className={styles.banner_title} color={Colors.white} fontWeight={700}>
          {props.data[curIndex].title}
        </Headline2>
        <Subtitle2 element="p" className={styles.banner_sub_title} color={Colors.white}>
          {props.data[curIndex].subtitle}
        </Subtitle2>
      </div>
    </div>
  )
}