import React from 'react';
import {
  Input,
} from '@class101/ui';
import styles from './Header.module.scss';
import Logo from './logo-svg';

export default function Header(params: any) {
  return (
    <header className={styles.header_container}>
      <Logo />
      {/* <Buttons /> */}
      <form>
        <Input type='search'/>
      </form>
    </header>
  )
}