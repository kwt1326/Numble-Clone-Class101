import { Card, CoverRatio } from '@class101/ui';
import {
  MdRecommendClassData,
  OpenSoonClassDataType,
  TimeDealClassDataType
} from '../interface/ClassDataType';
import { PopularEventDataType } from '../interface/EventDataType';

import Menu from '../components/Menu';
import Header from '../components/Header';
import Banner from '../components/Banner';
import BeltBanner from '../components/BeltBanner';
import renderPagenationCarosel from '../components/PagenationCarosel';
import {
  renderTimedealExtraTopNode,
  renderExtraBottomNode,
  renderCoupon,
  renderHeart,
  renderCardInnerNode
} from '../components/CardComponents';

import {
  caroselBottomEventData,
  caroselTopEventData
} from '../constants/carosel_data';
import {
  classMdRecommandData,
  classOpenSoonData,
  classTimeDealData
} from '../constants/class_data';
import { popularEventData } from '../constants/popular_event_data';

import styles from './Main.module.scss';
import MiniBanner from '../components/MiniBanner';

function Main() {
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
              coverImageAlt='class_img'
              title={data.title}
              coverImageRatio={CoverRatio.RATIO_4X3}
              extraTop={renderTimedealExtraTopNode(data)}
              extraBottom={renderExtraBottomNode(data)}
            >
              {renderCoupon(data, '#5820CF')}
              {renderHeart()}
              {renderCardInnerNode(data)}
            </Card>
          )
        })
      }
      <div className={styles.carosel_spacing_box}></div>
      {
        renderPagenationCarosel({
          data: classMdRecommandData['md_recommend'],
          title: 'MD 추천 클래스',
          ratio: CoverRatio.RATIO_3X4,
          renderChild: (data: MdRecommendClassData, i: number) => (
            <Card
              className={styles.card_container}
              coverImage={data.img}
              coverImageAlt='class_img'
              title={data.title}
              coverImageRatio={CoverRatio.RATIO_3X4}
              extraBottom={renderExtraBottomNode(data)}
            >
              {renderCoupon(data, '#F3213B')}
              {renderHeart()}
              {renderCardInnerNode(data)}
            </Card>
          )
        })
      }
      <div className={styles.carosel_spacing_box}></div>
      {
        renderPagenationCarosel({
          perView: 3,
          data: popularEventData,
          title: '진행 중인 인기 이벤트',
          rightBtnText: '전체 클래스 보기',
          ratio: CoverRatio.RATIO_16X9,
          renderChild: (data: PopularEventDataType, i: number) => (
            <Card
              className={styles.card_container}
              coverImage={data.img}
              coverImageAlt='event_img'
              coverImageRatio={CoverRatio.RATIO_16X9}
              extraTop={renderTimedealExtraTopNode(data)}
            />
          )
        })
      }
      <div className={styles.carosel_spacing_box}></div>
      {
        renderPagenationCarosel({
          data: classOpenSoonData,
          title: '오픈 예정 클래스',
          subText: '오픈 예정인 클래스를 응원하면 얼리버드 오픈 시 알려드려요!',
          rightBtnText: '전체 클래스 보기',
          renderChild: (data: OpenSoonClassDataType, i: number) => (
            <Card
              className={styles.card_container}
              coverImage={data.img}
              coverImageAlt='class_img'
              title={data.title}
              extraBottom={renderExtraBottomNode(data)}
            >
              {renderCoupon(data, '#F3213B')}
              {renderHeart()}
              {renderCardInnerNode(data)}
            </Card>
          )
        })
      }
      <div className={styles.carosel_spacing_box}></div>
      <MiniBanner data={caroselBottomEventData} />
      <div className={styles.carosel_spacing_box}></div>
    </div>
  )
}

export default Main