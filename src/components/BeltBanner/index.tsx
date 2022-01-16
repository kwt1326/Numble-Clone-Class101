import React from 'react';
import styles from './BeltBanner.module.scss';
import { beltBannerData } from '../../constants/belt_banner_data';
import { Subtitle1 } from '@class101/ui';

export default function BeltBanner(props: { index: number } = { index: 0 }) {
  const data = beltBannerData[props.index];
  return (
    <div className={styles.belt_banner} style={{ background: data.bgColor }}>
      <div className={styles.spacing_box_top} />
      <div className={styles.inner_wrapper}>
        {
          Array.isArray(data.content) ?
            data.content?.map((content, i) => (
              <Subtitle1
                key={i}
                className={styles.content_style}
                lg="Subtitle1"
                sm="Body1"
                element="p"
                color={data.color}
                fontWeight={data.weight[i]}
              >
                {content}
              </Subtitle1>
            )) : (
              <Subtitle1
                className={styles.content_style}
                lg="Subtitle1"
                sm="Body1"
                element="p"
                color={data.color}
              >
                {data.content}
              </Subtitle1>
            )
        }
      </div>
      <div className={styles.spacing_box_bottom} />
    </div>
  )
}