import { Body2, Button, Headline2 } from '@class101/ui';
import React from 'react';
import { CaroselItem } from '../../interface/CaroselType';
import Carosel from '../Carosel';
import styles from './MiniBanner.module.scss';

export default function MiniBanner(props: { data: Array<CaroselItem> }) {
  return (
    <div className={styles.minibanner_container}>
      <Carosel
        swiperClass={styles.carosel_container}
        data={props.data}
        renderChild={(data) => (
          <div className={styles.minibanner_child} style={{ backgroundColor: data.bgColor }}>
            <div className={styles.minibanner_inner_child}>
              <div className={styles.text_content_wrap}>
                <Headline2
                  lg="Headline2"
                  sm="Headline3"
                  fontWeight={900}
                >
                  {data.title}
                </Headline2>
                <Body2
                  lg="Body2"
                  sm="Caption1"
                  element='p'
                >
                  {data.subtitle}
                </Body2>
                <Button className={styles.more_content_btn}>
                  더 알아보기
                </Button>
              </div>
              <div className={styles.minibanner_img}>
                <img src={data.img} alt="mini_banner_img" />
              </div>
            </div>
          </div>
        )}
        perView={1}
        autoplayDelay={6000}
        useInsideNavigation={false}
      />
    </div>
  )
}