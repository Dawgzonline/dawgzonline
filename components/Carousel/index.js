import React, { useRef, useState, Children } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "../../styles/Carousel.module.scss";

function Carousel({ children, height }) {
  const [currImg, setCurrImg] = useState(0);
  const carouselTraverse = useRef(0);
  const childrenArray = Children.toArray(children);
  const childrenCount = childrenArray.length;

  const rightSlide = () => {
    const traversal = 100 / childrenCount;
    if (carouselTraverse.current-traversal > -100) {
      carouselTraverse.current = carouselTraverse.current-traversal;
      setCurrImg((currentImg) => {
        return currentImg + 1;
      });
    }
  };

  const leftSlide = () => {
    const traversal = 100 / childrenCount;
    if (carouselTraverse.current + traversal <= 0) {
      carouselTraverse.current = carouselTraverse.current + traversal;
      setCurrImg((currentImg) => {
        return currentImg - 1;
      });
    }
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel-top} style={{ height: height }}>
        <div className={styles.carousel-left}>
          <ArrowBackIosIcon
            className={styles.carousel-arrow}
            onClick={leftSlide}
          />
        </div>

        <div
          className={styles.carousel-inner}
          style={{
            width: `${childrenCount * 100}%`,
            transform: `translateX(${carouselTraverse.current}%)`,
          }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={`carousel-child-${index}`}
              className={styles.carousel-item}
            >
              {child}
            </div>
          ))}
        </div>

        <div className={styles.carousel-right}>
          <ArrowForwardIosIcon
            className={styles.carousel-arrow}
            onClick={rightSlide}
          />
        </div>
      </div>
      <div className={styles.carousel-bottom}>
        {childrenArray.map((child, index) => (
          <div
            key={`carousel-child-dot-${index}`}
            className={styles.carousel-bottom-dots}
            style={{
              backgroundColor: currImg === index ? "var(--dark-color)" : "",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
