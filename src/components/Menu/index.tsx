import { Body1 } from '@class101/ui';
import React from 'react';
import styles from './Menu.module.scss';

const mainMenuItem = [
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
      <Body1 className={styles.menu_item} fontWeight="bold">전체 카테고리</Body1>
      {
        mainMenuItem.map((item) => (
          <Body1 className={styles.menu_item} fontWeight="bold">{item}</Body1>
        ))
      }
      {
        subMenuItem.map((item) => (
          <Body1 className={styles.menu_item}>{item}</Body1>
        ))
      }
    </div>
  )
}