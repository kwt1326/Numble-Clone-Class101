import React from 'react';
import {
  Input,
  Colors,
  Subtitle1,
  Body2,
  
} from '@class101/ui';
import styles from './Header.module.scss';
import Logo from './logo-svg';

const headerButtonLeft = ['클래스', '스토어']
const headerButtonRight = ['크리에이터 지원', '기업교육', '로그인']

export default function Header(params: any) {
  return (
    <header className={styles.header_container}>
      <Logo />
      <div className={styles.nav_left_btn}>
        {
          headerButtonLeft.map((item, i) => (
            <Subtitle1 key={i} element="h4" color={i === 0 ? Colors.orange500 : Colors.black}>
              {item}
            </Subtitle1>
          ))
        }
      </div>
      <form>
        <Input
          type='search'
          className={styles.search}
          placeholder="찾으시는 취미가 있으신가요?"
        />
      </form>
      <div className={styles.nav_right_btn}>
        {headerButtonRight.map((item, i) => <Body2 key={i} element={"p"}>{item}</Body2>)}
      </div>
    </header>
  )
}