import React, { useRef, useState, Children } from "react";
import ArrowBackIosIcon from "@mui/icons_material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons_material/ArrowForwardIos";
import styles from "../../styles/Carousel.module.scss";

function Carousel({ children, height }) {
  const [currImg, setCurrImg] = useState(0);
  const carouselTraverse = useRef(0);
  const childrenArray = Children.toArray(children);
  const childrenCount = childrenArray.length;

  const rightSlide = () => {
    const traversal = 100 / childrenCount;
    if (carouselTraverse.current_traversal > -100) {
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
      <div className={styles.carousel_top} style={{ height: height }}>
        <div className={styles.carousel_left}>
          <ArrowBackIosIcon
            className={styles.carousel_arrow}
            onClick={leftSlide}
          />
        </div>

        <div
          className={styles.carousel_inner}
          style={{
            width: `${childrenCount * 100}%`,
            transform: `translateX(${carouselTraverse.current}%)`,
          }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={`carousel_child_${index}`}
              className={styles.carousel_item}
            >
              {child}
            </div>
          ))}
        </div>

        <div className={styles.carousel_right}>
          <ArrowForwardIosIcon
            className={styles.carousel_arrow}
            onClick={rightSlide}
          />
        </div>
      </div>
      <div className={styles.carousel_bottom}>
        {childrenArray.map((child, index) => (
          <div
            key={`carousel_child_dot_${index}`}
            className={styles.carousel_bottom_dots}
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
