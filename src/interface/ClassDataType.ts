export type CommonClassDataType = {
  id: number;
  title: string;
  creator: string;
  img: string;
}

export type TimeDealClassDataType = CommonClassDataType & {
  like: number;
  thumsUp: number;
  price?: {
    originalPrice: number;
    salePrice: number;
    installment: number;
  },
  coupon: number;
}

export type OpenSoonClassDataType = CommonClassDataType & {
  cheer: {
    goal: number;
    score: number;
    finishDate: string;
  }
}