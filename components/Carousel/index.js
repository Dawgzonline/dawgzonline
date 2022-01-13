import React, { useRef, useState, Children } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



function Carousel( {children,height}) {

    const [currImg, setCurrImg] = useState(0);
    const carouselTraverse = useRef(0);
    const childrenArray = Children.toArray(children);
    const childrenCount = childrenArray.length;

    const rightSlide = () => {
       const traversal = 100 / childrenCount ;
       if(carouselTraverse.current -traversal > -100){
           carouselTraverse.current = carouselTraverse.current - traversal;
           setCurrImg((currentImg) => {
               return currentImg + 1;
           });
       }
    }

    const leftSlide = () => {
        const traversal = 100 / childrenCount;
        if(carouselTraverse.current + traversal <= 0){
            carouselTraverse.current = carouselTraverse.current + traversal;
           setCurrImg((currentImg) => {
               return currentImg - 1;
           });
        }
    }

    

    return (
        <div className="carousel">	
            <div className="carousel-top" style={{height : height}}>
                <div className="carousel-left" >
                    <ArrowBackIosIcon className="carousel-arrow" onClick={leftSlide}/>
                </div>

                <div className="carousel-inner" style={{ width : `${childrenCount * 100}%`, transform : `translateX(${carouselTraverse.current}%)`}}>
                    {childrenArray.map((child, index) => (
                        <div key={`carousel-child-${index}`} className="carousel-item">
                            {child}
                        </div>
                    ))}
                </div>

                <div className="carousel-right" >
                    <ArrowForwardIosIcon className="carousel-arrow" onClick={rightSlide}/>
                </div>
            </div>
            <div className="carousel-bottom">
                {childrenArray.map(( child, index) => (
                <div key={`carousel-child-dot-${index}`} className="carousel-bottom-dots" style={{backgroundColor: currImg === index ? 'var(--dark-color)' : '' }}></div>
                ))}
            </div>
        </div>
    )
}

export default Carousel


