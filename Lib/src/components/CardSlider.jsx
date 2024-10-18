import React, { useState, useEffect, useRef } from 'react';
import '../components/styles/slidercardcss.css';
import 'bootstrap'; // Import Bootstrap's JavaScript if needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS

function CardSlider({
  array,
  CardComponent,
  cardNumPerView,
  autoArrange,
  buttonColor,
  buttonWidth,
  buttonHeight,
  cutOneCardPerView,
  buttonPosition,
  buttonPositionGap,
  cardSpacing,
  slideTimeInterval,
  allowSlidePerInterval,
  LeftSvgIcon,
  RightSvgIcon,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState(getBreakpoint());
  const [slicedCard, setSlicedCard] = useState([]);
  const [cardHover, setCardHover] = useState(false);
  const [slideAnimationLeft, setSlideAnimationLeft] = useState(false);
  const [slideAnimationRight, setSlideAnimationRight] = useState(false);
  const intervalRef = useRef(null);

  function getBreakpoint() {
    const width = window.innerWidth;
    if (width < 576) {
      return 1;
    } else if (width >= 576 && width < 768) {
      return 2;
    } else if (width >= 768 && width < 1100) {
      return 3;
    } else {
      return 4;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 662) {
        setScreenSize(1);
      } else if (window.innerWidth >= 662 && window.innerWidth < 992) {
        setScreenSize(2);
      } else if (window.innerWidth >= 992 && window.innerWidth < 1250) {
        setScreenSize(3);
      } else {
        setScreenSize(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, [screenSize]);

// Memoize the nextSlide function
const nextSlide = React.useCallback(() => {
  setSlideAnimationRight(true);
  setSlideAnimationLeft(false);

  setTimeout(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === array.length - (autoArrange ? screenSize : cardNumPerView) ? 0 : prevIndex + 1
    );
    setSlideAnimationRight(false); // Reset after sliding
  }, 800); // Match the CSS transition time
}, [array.length, autoArrange, screenSize, cardNumPerView]);

// Memoize the prevSlide function
const prevSlide = React.useCallback(() => {
  setSlideAnimationLeft(true);
  setSlideAnimationRight(false);

  setTimeout(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? array.length - (autoArrange ? screenSize : cardNumPerView) : prevIndex - 1
    );
    setSlideAnimationLeft(false); // Reset after sliding
  }, 800); // Match the CSS transition time
}, [array.length, autoArrange, screenSize, cardNumPerView]);

  useEffect(() => {
    let rearrangeFruits = (currentIndex) => {
      let add = (autoArrange ? screenSize : cardNumPerView) - 1;
      let multiply = (autoArrange ? screenSize : cardNumPerView);
      let leftResult = (currentIndex - 1) * multiply + add + (multiply + 1);
      let rightResult = (currentIndex - 1) * multiply + add;
      let part1 = array.slice(
        currentIndex ? rightResult : 0,
        currentIndex ? leftResult : currentIndex + (autoArrange ? screenSize : cardNumPerView)
      );

      if (array.length < (autoArrange ? screenSize : cardNumPerView)) {
        part1 = array.slice(0, currentIndex + (autoArrange ? screenSize : cardNumPerView));
        return part1;
      }

      if (rightResult > array.length - 2) {
        let lastElement = part1[part1.length - 1];
        let findIndex = array.lastIndexOf(lastElement);
        let newIndex = leftResult - findIndex - 1;
        let part2 = array.slice(0, newIndex);
        part1 = part1.concat(part2);
        setCurrentIndex(0);
        return part1;
      }

      return part1;
    };
    let rearrangeFruits2 = (currentIndex) => {
        let part1 = array.slice(currentIndex, currentIndex+(autoArrange ? screenSize : cardNumPerView)).slice(-(autoArrange ? screenSize : cardNumPerView));
        let part2 = array.slice(-currentIndex%1, currentIndex%1).slice(-currentIndex%1);
        let result = part1.concat(part2);
        return result;
      };
    setSlicedCard(cutOneCardPerView? rearrangeFruits2(currentIndex).slice(-(autoArrange ? screenSize : cardNumPerView)):rearrangeFruits(currentIndex).slice(-(autoArrange ? screenSize : cardNumPerView)));
    //setSlicedCard(rearrangeFruits(currentIndex).slice(-(autoArrange ? screenSize : cardNumPerView)));
  }, [currentIndex, screenSize]);

  useEffect(() => {
    if (allowSlidePerInterval && cardHover === false) {
      intervalRef.current = setInterval(nextSlide, slideTimeInterval || 3250);
    }

    return () => allowSlidePerInterval && cardHover === false && clearInterval(intervalRef.current);
  }, [nextSlide, cardHover]);

  function cardHoverFunc() {
    setCardHover(true);
  }
  function cardLeaveFunc() {
    setCardHover(false);
  }

  return (
    <div className='my-5'>
      <div onMouseOver={cardHoverFunc} onMouseLeave={cardLeaveFunc} className='position-relative slide-container'>
        <div
          style={{ gap: `${cardSpacing}` }}
          className={`${slideAnimationRight && 'card-slider-right'} ${slideAnimationLeft && 'card-slider-left'} d-flex flex-row flex-nowrap justify-content-center align-items-center`}
        >
          {slicedCard.map((card, index) => (
            <CardComponent key={index} cardProp={card} />
          ))}
        </div>

        <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center w-100'>
          <button
            id='prev'
            onClick={prevSlide}
            style={{ paddingRight: `${buttonPositionGap}`, transform: 'translate(-30px)' }}
            className={
              buttonPosition === 'middle'
                ? 'border-0 bg-transparent position-absolute top-50 start-0 translate-middle-y'
                : buttonPosition === 'middle-bottom'
                ? 'border-0 bg-transparent position-absolute mt-2 top-100 start-50'
                : 'border-0 bg-transparent position-absolute top-50 start-0 translate-middle-y'
            }
          >
            {LeftSvgIcon ? <LeftSvgIcon /> : <svg className='prev-btn' width={buttonWidth || '54px'} height={buttonHeight || '54px'} viewBox='0 0 24 24' fill='none'><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM13.79 15C14.08 15.29 14.08 15.77 13.79 16.06C13.64 16.21 13.45 16.28 13.26 16.28C13.07 16.28 12.88 16.21 12.73 16.06L9.2 12.53C8.91 12.24 8.91 11.76 9.2 11.47L12.73 7.94C13.02 7.65 13.5 7.65 13.79 7.94C14.08 8.23 14.08 8.71 13.79 9L10.79 12L13.79 15Z" fill={buttonColor || '#000'}></path></svg>}
          </button>

          <button
            onClick={nextSlide}
            style={{ paddingLeft: `${buttonPositionGap}`, transform: 'translate(30px)' }}
            className={
              buttonPosition === 'middle'
                ? 'next border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y'
                : buttonPosition === 'middle-bottom'
                ? 'next border-0 bg-transparent position-absolute mt-2 top-100 start-50'
                : 'next border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y'
            }
          >
            {RightSvgIcon ? <RightSvgIcon /> : <svg className='next-btn' width={buttonWidth || '54px'} height={buttonHeight || '54px'} viewBox='0 0 24 24' fill='none'><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z" fill={buttonColor || '#000'}></path></svg>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardSlider;
