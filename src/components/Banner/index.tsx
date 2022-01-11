import React, { useState } from 'react';
import Carosel from '../Carosel';
import { CaroselItem } from '../../interface/CaroselType';
import styles from './Banner.module.scss';

export default function Banner(props: { data: Array<CaroselItem> }) {
  const [curIndex, setCurIndex] = useState(0);

  const onIndexChange = (index: number) => {
    setCurIndex(index);
  }

  return (
    <div className={styles.container} style={{ background: props.data[curIndex].bgColor || 'white' }}>
      <div className={styles.banner_wrap}>
        <Carosel
          data={props.data}
          onIndexChange={onIndexChange}
          contentSize={{ width: 500, height: 500 }}
          containerStyle={{ position: 'absolute', top: 48 }}
        />
        <div className={styles.banner_text_wrap} style={{ height: 500 }}>
          <p className={styles.banner_title}>{props.data[curIndex].title}</p>
          <p className={styles.banner_sub_title}>{props.data[curIndex].subtitle}</p>
        </div>
      </div>
    </div>
  )
}