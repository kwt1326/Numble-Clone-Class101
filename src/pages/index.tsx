import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { caroselData } from '../constants/carosel_data';

function Main() {
  return (
    <div>
      <Header />
      <Banner data={caroselData['top_event']} />
    </div>
  )
}

export default Main