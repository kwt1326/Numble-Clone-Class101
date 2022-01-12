/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { CaroselItem } from '../../interface/CaroselType';
import styles from "./Carosel.module.scss";

type ComponentProps = {
  data: Array<CaroselItem>
  contentSize: { width: number, height: number }
  containerStyle?: React.CSSProperties
  onIndexChange?: Function;
  useAutoPlay?: boolean;
}

/**
 * Carosel Component 구현체
 * 
 * @author wontae Kim
 * @param props {ComponentProps}
 * @returns JSX.Element
 */
export default function Carosel(props: ComponentProps) {
  const { data } = props;

  const scrollRef = useRef<HTMLDivElement>(null);
  
  let dragStart = false;
  let shiftX = 0;
  let curIndex = 0;
  let timerId: number | undefined;

  useEffect(() => {
    if (data.length > 0) {
      const { current } = scrollRef;
      if (current) {
        current.addEventListener("mousedown", (e) => onMouseDown(e), false)

        document.addEventListener("mouseup", (e) => onMouseUp(e), false)
        document.addEventListener("mousemove", (e) => onMouseMove(e), false)  
        props.useAutoPlay && startAutoPlay();
      }
    }

    // cleanup (unmount)
    return function cleanup() {
      const { current } = scrollRef;
      if (current) {
        current.addEventListener("mousedown", (e) => onMouseDown(e), false)
      }
      document.removeEventListener("mouseup", (e) => onMouseUp(e), false)
      document.removeEventListener("mousemove", (e) => onMouseMove(e), false)
      stopAutoPlay();
    };
  }, [])

  // shiftX 계산
  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (scrollRef.current) {
      const rect = scrollRef.current.getBoundingClientRect();
      shiftX = e.x - rect.left;
      dragStart = true;
      props.useAutoPlay && stopAutoPlay();
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (dragStart && scrollRef.current) {
      const leftX = e.pageX - shiftX;
      scrollRef.current.style.left = `${leftX}px`;
    }
  }

  const onMouseUp = async (e: MouseEvent) => {
    e.preventDefault();
    if (scrollRef.current) {
      dragStart = false;

      const { onIndexChange } = props;
      const _curIndex = await finishMove(e);

      if (onIndexChange) {
        onIndexChange(_curIndex)
      }
      
      props.useAutoPlay && startAutoPlay();
    }
  }

  const startAutoPlay = () => {
    if (scrollRef.current) {
      scrollRef.current.style.transition = 'ease-in-out 0.5s';
    }
    clearInterval(timerId)
    timerId = setInterval(() => autoPlayMove(), 3000) as unknown as number
  }

  const stopAutoPlay = () => {
    if (scrollRef.current) {
      scrollRef.current.style.transition = 'none';
    }
    clearInterval(timerId)
  }

  const autoPlayMove = () => {
    if (!dragStart && scrollRef.current) {
      curIndex = (curIndex === (data.length - 1)) ? 0 : curIndex + 1;

      const rectWidth = Math.floor(scrollRef.current.offsetWidth / data.length);
      const leftX = -(curIndex * rectWidth);
      scrollRef.current.style.left = `${leftX}px`;
    }
  }

  // 스크롤 중단시 블록위치를 fit 하게 맞추는 로직
  const finishMove = async (e: MouseEvent) => {
    if (!dragStart && scrollRef.current) {
      const rectWidth = Math.floor(scrollRef.current.offsetWidth / data.length);
      const curLeft = Number(scrollRef.current.style.left?.split('px')[0]);

      if (Number.isNaN(curLeft) === false) {
        // 현재 스크롤로 보여지는 가장 가까운 rect 의 index
        // 이동한 만큼을 블록 크기로 나눈 나머지가 블록의 절반보다 클 경우 mouseUp 때 남은 부분을 마저 이동합니다.
        // 반대라면 나머지 만큼을 다시 back 시킵니다.
        const curPointIndex = Math.abs(Math.floor(curLeft / rectWidth));
        const leftX = -(curPointIndex * rectWidth);

        scrollRef.current.style.transition = 'ease-in-out 0.5s';
        scrollRef.current.style.left = `${leftX}px`;
        return curPointIndex;
      }
    }
    return null;
  }

  return (
    <div className={styles.container} style={{ ...props.containerStyle, ...props.contentSize }}>
      <div ref={scrollRef} className={styles.carosel_item_wrap}>
        {
          data.map((item: CaroselItem, i: number) => (
            <div
              key={i}
              className={styles.carosel_img_wrap}
              onClick={(e) => curIndex = i}
            >
              <img src={item.img} alt="carosel_item_img" style={props.contentSize} />
              {
                item.badge && (
                  <p className={styles.carosel_badge}>{item.badge}</p>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}