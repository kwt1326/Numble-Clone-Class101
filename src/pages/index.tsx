import React, { Fragment, ReactNode } from 'react';
import { Body1, Body2, Caption1, Caption2, Card, Colors, Headline3 } from '@class101/ui';
import { TimeDealClassDataType } from '../interface/ClassDataType';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Carosel from '../components/Carosel';
import BeltBanner from '../components/BeltBanner';
import {
  caroselTopEventData
} from '../constants/carosel_data';
import {
  classTimeDealData
} from '../constants/class_data';

import styles from './Main.module.scss';
import { SvgHeart, SvgLike } from '../components/Svg';
import priceComma from '../helper/costComma';

function Main() {
  const renderPagenationCarosel = <T extends unknown>(params: {
    data: Array<T>;
    title: string;
    renderChild(data: unknown, index: number): ReactNode;
    rightBtnText?: string;
  }): JSX.Element => (
    <div className={styles.class_container}>
      <div className={styles.header}>
        <Headline3
          lg="Headline3"
          sm="Subtitle1"
          element="h4"
          fontWeight={900}
        >
          {params.title}
        </Headline3>
        {
          params.rightBtnText ? (
            <Body1
              lg="Body1"
              sm="Body2"
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
        perView={4}
        spaceBetween={24}
        swiperClass={styles.class_swiper_container}
        renderChild={params.renderChild}
      />
    </div>
  )

  const renderTimedealExtraTopNode = (data: TimeDealClassDataType) => (
    <Fragment>
      <div className={styles.class_timedeal_top_node}>
        <Caption2
          fontWeight={900}
          color={Colors.white}
        >
          <div>
            <span>⏱</span>
            <span className={styles.inner_text_timedeal}>
              {'타임딜 종료까지'}
            </span>
          </div>
        </Caption2>
        <Caption2
          fontWeight={900}
          color={Colors.white}
        >
          {'1일'}
        </Caption2>
      </div>
      <Caption1 fontWeight={900}>
        {data.creator}
      </Caption1>
    </Fragment>
  )

  const renderExtraBottomNode = (data: any) => (
    <div className={styles.class_bottom_node}>
      <Caption1
        className={styles.flex_row_center}
        color={Colors.gray600}
      >
        <SvgHeart />
        <div className={styles.heart}>{data.like}</div>
        <SvgLike />
        <div className={styles.like}>{data.thumsUp}%</div>
      </Caption1>
    </div>
  )

  const renderCoupon = (data: any, color: string) => (
    <div className={styles.coupon} style={{ backgroundColor: color }}>
      <Caption1
        color={Colors.white}
        fontWeight={900}
      >
        {data.coupon}만원 쿠폰
      </Caption1>
    </div>
  )

  const renderCardInnerNode = (data: any) => {
    const monthSaleCost = priceComma(
      String(Math.floor(data.price.salePrice / data.price.installment))
    );
    const monthCost = priceComma(
      String(Math.floor(data.price.originalPrice / data.price.installment))
    )
    return (
      <div className={styles.class_card_inner_node}>
        <div className={styles.horizon_sparator} />
        <div className={styles.price_wrap}>
          <Body2
            element="p"
            color={Colors.red500}
            fontWeight={700}
          >
            {monthSaleCost}원
          </Body2>
          <Body2
            element="p"
            fontWeight={700}
          >
            월 {monthCost}원
          </Body2>
          <Caption1
            element="p"
            color={Colors.gray600}
          >
            ({data.price.installment}개월)
          </Caption1>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <Menu />
      <Banner data={caroselTopEventData} />
      <BeltBanner index={0} />
      {
        renderPagenationCarosel({
          data: classTimeDealData,
          title: '오늘의 특가! TIME DEAL',
          rightBtnText: '전체 클래스 보기',
          renderChild: (data: TimeDealClassDataType, i: number) => (
            <Card
              className={styles.card_container}
              coverImage={data.img}
              coverImageAlt='time_deal_img'
              title={data.title}
              extraTop={renderTimedealExtraTopNode(data)}
              extraBottom={renderExtraBottomNode(data)}
            >
              {renderCoupon(data, '#5820CF')}
              {renderCardInnerNode(data)}
            </Card>
          )
        })
      }
      <div className={styles.carosel_spacing_box}></div>
      {
        renderPagenationCarosel({
          data: classTimeDealData,
          title: '오늘의 특가! TIME DEAL',
          rightBtnText: '전체 클래스 보기',
          renderChild: (data: TimeDealClassDataType, i: number) => (
            <Card
              coverImage={data.img}
              coverImageAlt='time_deal_img'
            />
          )
        })
      }
    </div>
  )
}

export default Main