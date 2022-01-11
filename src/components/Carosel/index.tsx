/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import { CaroselItem } from '../../interface/CaroselType';
import styles from "./Carosel.module.scss";

type ComponentProps = {
  data: Array<CaroselItem>
  contentSize: { width: number, height: number }
  containerStyle?: React.CSSProperties
  onIndexChange?: Function;
}

export default function Carosel(props: ComponentProps) {
  const { data } = props;
  const [curIndex, setCurrentIndex] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  let dragStart = false;
  let shiftX = 0;

  useEffect(() => {
    setInterval(() => {
      const next = ((data.length - 1) > curIndex) ? 0 : curIndex + 1
      setCurrentIndex(next);
    }, 3000)
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      const { current } = scrollRef;
      if (current) {
        current.addEventListener("mousedown", (e) => onMouseDown(e), false)
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
    };
  }, [data.length])

  useEffect(() => {

  }, [curIndex])

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (scrollRef.current) {
      const rect = scrollRef.current.getBoundingClientRect();
      shiftX = e.x - rect.left;
      dragStart = true;

      document.addEventListener("mouseup", (e) => onMouseUp(e), false)
      document.addEventListener("mousemove", (e) => onMouseMove(e), false)
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (dragStart && scrollRef.current) {
      const leftX = e.pageX - shiftX;
      scrollRef.current.style.left = `${leftX}px`;
    }
  }

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();

    const { onIndexChange } = props;
    if (onIndexChange) {
      onIndexChange(curIndex)
    }
    if (scrollRef.current) {
      dragStart = false;

      document.removeEventListener("mouseup", (e) => onMouseUp(e), false)
      document.removeEventListener("mousemove", (e) => onMouseMove(e), false)
    }
  }

  return (
    <div className={styles.container} style={{ ...props.containerStyle, ...props.contentSize }}>
      <div ref={scrollRef} className={styles.carosel_item_wrap}>
        {
          data.map((item: CaroselItem, i: number) => (
            <div
              key={i}
              className={styles.carosel_img_wrap}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(i)
              }}
            >
              <img src={item.img} alt="carosel_item_img" style={props.contentSize} />
              <p className={styles.carosel_badge}>{item.badge}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}