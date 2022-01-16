import React from 'react';
import Main from './pages';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

function App() {
  return <Main />
}

export default App;
