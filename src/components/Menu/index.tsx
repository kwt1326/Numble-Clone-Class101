import React from 'react';
import { Body1 } from '@class101/ui';
import styles from './Menu.module.scss';

const mainMenuItem = [
  '새해 다짐격파',
  '1월 가입혜택',
  '이벤트',
  '바로 수강',
  '신규 클래스',
  '오픈 예정',
]

const subMenuItem = [
  '시그니처',
  '키즈',
  '원포인트 클래스',
]

export default function renderMenu() {
  return (
    <div className={styles.container}>
      <Body1
        className={styles.menu_item}
        fontWeight="bold"
      >
        {'전체 카테고리'}
      </Body1>
      {
        mainMenuItem.map((item, i) => (
          <div className={styles.menu_item}>
            <Body1
              key={i}
              fontWeight="bold"
            >
              {item}
            </Body1>
          </div>
        ))
      }
      <div className={styles.vertical_sparator}></div>
      {
        subMenuItem.map((item, i) => (
          <Body1 key={i} className={styles.menu_item}>{item}</Body1>
        ))
      }
    </div>
  )
}
