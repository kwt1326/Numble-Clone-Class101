import React, { Fragment, ReactNode } from 'react';
import { Headline3, Body1, Colors, CoverRatio } from '@class101/ui';
import Carosel from '../Carosel';

import styles from './PagenationCarosel.module.scss';

export default function renderPagenationCarosel<T extends unknown>(params: {
  data: Array<T>;
  title: string;
  renderChild(data: unknown, index: number): ReactNode;
  perView?: number;
  subText?: string;
  ratio?: CoverRatio;
  rightBtnText?: string;
}): JSX.Element {
  return (
    <div className={styles.class_container}>
      <div className={styles.header}>
        <div className={styles.header_title}>
          <Headline3
            lg="Headline3"
            sm="Subtitle1"
            element="h4"
            fontWeight={900}
          >
            {params.title}
          </Headline3>
          {
            params?.subText && (
              <Body1
                lg="Body1"
                sm="Body2"
                element="h6"
                fontWeight={500}
                color={Colors.gray600}
              >
                {params.subText}
              </Body1>
            )
          }
        </div>
        {
          params.rightBtnText ? (
            <Body1
              lg="Body1"
              sm="Body2"
              element="h6"
              fontWeight={900}
              color={Colors.gray600}
            >
              {params.rightBtnText}
            </Body1>
          ) : <></>
        }
      </div>
      <Carosel
        data={params.data}
        perView={params.perView || 4}
        spaceBetween={24}
        swiperClass={styles.class_swiper_container}
        renderChild={params.renderChild}
        useOutsideNavigation={true}
        ratio={params.ratio}
      />
    </div>
  )
}
