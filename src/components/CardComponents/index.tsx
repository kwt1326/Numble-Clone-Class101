import { Caption2, Colors, Caption1, Body2, Button } from "@class101/ui"
import dayjs from "dayjs"
import { Fragment } from "react"
import priceComma from "../../helper/costComma"
import { TimeDealClassDataType } from "../../interface/ClassDataType"
import { PopularEventDataType } from "../../interface/EventDataType"
import { SvgCheer, SvgHeart, SvgLike } from "../Svg"

import styles from './CardComponents.module.scss';

export const renderTimedealExtraTopNode = (data: any) => {
  if (data?.period) {
    const _data: PopularEventDataType = data;
    const finishDate = dayjs('20' + _data.period.finishDate.split('-').join(''));
    const startDate = dayjs('20' + _data.period.startDate.split('-').join(''));
    const dDay = finishDate.diff(startDate, 'day')
    
    return (
      <div>
        <Body2 fontWeight={900} >{_data.title}</Body2>
        <Caption2
          fontWeight={900}
        >
          <span style={{ color: Colors.red600 }}>D-{dDay > 0 ? dDay : 'Day'}</span>
          <span style={{ fontWeight: 500, marginLeft: 5 }}>
            {`${startDate.format('MM.DD')} (${startDate.format('dddd').split('요일')[0]})~`}
          </span>
          <span style={{ fontWeight: 500 }}>
            {`${finishDate.format('MM.DD')} (${finishDate.format('dddd').split('요일')[0]})`}
          </span>
        </Caption2>
      </div>
    )
  }

  const _data: TimeDealClassDataType = data;
  return (
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
        {_data.creator}
      </Caption1>
    </Fragment>
  )
}

export const renderExtraBottomNode = (data: any) => (
  <div className={styles.class_bottom_node}>
    <Caption1
      className={styles.flex_row_center}
      color={Colors.gray600}
    >
      {
        data?.cheer && (function () {
          const cheerPercent = Math.floor((data?.cheer?.goal / data?.cheer?.score) * 100)
          return (
            <Fragment>
              <SvgCheer />
              <div
                className={styles.cheer}
                style={{ color: Colors.red500 }}
              >{cheerPercent}% 달성</div>
            </Fragment>
          )
        })()
      }
      {
        Number(data?.like) > 0 && (
          <Fragment>
            <SvgHeart />
            <div className={styles.heart}>{data.like}</div>
          </Fragment>
        )
      }
      {
        Number(data?.thumsUp) > 0 && (
          <Fragment>
            <SvgLike />
            <div className={styles.like}>{data.thumsUp}%</div>
          </Fragment>
        )
      }
    </Caption1>
  </div>
)

export const renderCoupon = (data: any, color: string) => (
  Number(data.coupon) > 0 ? (
  <div className={styles.coupon} style={{ backgroundColor: color }}>
    <Caption1
      color={Colors.white}
      fontWeight={900}
    >
      {data.coupon}만원 쿠폰
    </Caption1>
  </div>
  ) : null
)

export const renderHeart = () => <div className={styles.like_heart} />

export const renderCardInnerNode = (data: any) => {
  if (data?.price) {
    if (data.price.salePrice < data.price.originalPrice) {
      const monthSaleCost = data.price.salePrice / data.price.originalPrice;
      const salePercent = 100 - Math.floor(monthSaleCost * 100);
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
              {salePercent}%
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
      <div className={styles.class_card_inner_node}>
        <div className={styles.horizon_sparator} />
        <div className={styles.price_wrap}>
          <Body2
            element="p"
            color={Colors.red500}
            fontWeight={700}
          >
            {100}%
          </Body2>
          <Body2
            element="p"
            fontWeight={700}
          >
            월 {0}원
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
  } else if (data?.cheer?.finishDate) {
    const remainDate = dayjs(data.cheer.finishDate).diff(new Date(), "day");
    return (
      <Fragment>
        <div className={styles.horizon_sparator} />
        <Caption1 element="p">
          <span style={{ color: Colors.gray600, marginRight: 4 }}>응원 마감까지</span>
          <span>{remainDate}일 남음</span>
        </Caption1>
        <Button className={styles.cheer_btn}>응원하기</Button>
      </Fragment>
    )
  } else if (data?.period) {
    return (
      <div>
        <span></span>
        <span></span>
      </div>
    )
  }
  return null;
}