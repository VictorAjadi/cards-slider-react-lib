import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap'; // Import Bootstrap's JavaScript if needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS
import './styles/slidercardcss.css'
function CardSlider({array, CardComponent, cardNumPerView,autoArrange,buttonColor,buttonWidth,buttonHeight,buttonPosition,buttonPositionGap,cardSpacing, slideTimeInterval ,allowSlidePerInterval,LeftSvgIcon,RightSvgIcon}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [screenSize, setScreenSize] = React.useState(getBreakpoint());
  const [slicedCard, setSlicedCard] = React.useState([]);
  const [cardHover, setCardHover] = React.useState(false);

  const [slideAnimationLeft, setSlideAnimationLeft] = React.useState(false);
  const [slideAnimationRight, setSlideAnimationRight] = React.useState(false);

  const intervalRef=React.useRef(null);
  function getBreakpoint() {
    const width = window.innerWidth;
    if (width < 576) {
      return 1; // Extra small (not a Bootstrap size, but can be used for consistency)
    } else if (width >= 576 && width < 768) {
      return 2;
    } else if (width >= 768 && width < 1100) {
      return 3;
    } else {
      return 4;
    }
  }

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 662) {
        setScreenSize(1); // Extra small (not a Bootstrap size, but can be used for consistency)
      } else if (window.innerWidth >= 662 && window.innerWidth < 992) {
        setScreenSize(2);
      } else if (window.innerWidth >= 992 && window.innerWidth < 1250) {
        setScreenSize(3);
      } else  {
        setScreenSize(4);
      } 
    };

    window.addEventListener('resize', handleResize);

    // Call handleResize to set the initial screen size on mount
    handleResize();

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [screenSize]);

  const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === array.length-(autoArrange ? screenSize : cardNumPerView) ? 0 : prevIndex + 1
      );
      setSlideAnimationRight(true);
      setSlideAnimationLeft(false);
      setTimeout(()=>{
        setSlideAnimationRight(false);
      },800)
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? array.length-(autoArrange ? screenSize : cardNumPerView) : prevIndex - 1
      );
      setSlideAnimationLeft(true);
      setSlideAnimationRight(false);
      setTimeout(()=>{
        setSlideAnimationLeft(false);
      },800)
    };
  
    React.useEffect(()=>{
      let rearrangeFruits = (currentIndex) => {
        let add=(autoArrange ? screenSize : cardNumPerView) - 1;
        let multiply=(autoArrange ? screenSize : cardNumPerView);
        let leftResult=(((currentIndex-1)*multiply)+add)+(multiply+1);
        let rightResult=((currentIndex-1)*multiply)+add;
        let part1 = array.slice(currentIndex ? rightResult : 0, currentIndex ? leftResult : currentIndex + (autoArrange ? screenSize : cardNumPerView));
        if(rightResult>array.length-2){
          let lastElement = part1[part1.length - 1];
          let findIndex = array.lastIndexOf(lastElement);
          let newIndex=leftResult-findIndex-1;
          let part2=array.slice(0,newIndex);
          part1=part1.concat(part2);
          setCurrentIndex(0)            
          return part1;
        }
        if(part1.length <= 0 ){
           part1 = array.slice( 0, currentIndex + (autoArrange ? screenSize : cardNumPerView));
           return part1;
        }
        if(part1.length < (autoArrange ? screenSize : cardNumPerView) && part1.length > 0){
          let lastElement = part1[part1.length - 1];
          let findIndex = array.lastIndexOf(lastElement);
          let newIndex=leftResult-findIndex-1;
          let part2=array.slice(0,newIndex);
          part1=part1.concat(part2);
          return part1;
        }
        return part1;
      };
      setSlicedCard(rearrangeFruits(currentIndex).slice(-(autoArrange ? screenSize : cardNumPerView)));
    },[currentIndex,screenSize])

    useEffect(() => {
      
      (allowSlidePerInterval && cardHover===false) && (intervalRef.current = setInterval(nextSlide,slideTimeInterval || 3250));
  
      return () =>(allowSlidePerInterval && cardHover===false) && clearInterval(intervalRef.current);
    }, [nextSlide,cardHover]);
    
    function cardHoverFunc(){
      setCardHover(true);
    }
    function cardLeaveFunc(){
      setCardHover(false);
    }
return (
  <div className='my-5'>
        <div 
        onMouseOver={()=>cardHoverFunc()}
        onMouseLeave={()=>cardLeaveFunc()}
        className='position-relative slide-container'
        >
           <div 
           style={{gap: `${cardSpacing}`}}
            className={`${slideAnimationRight && 'card-slider-right'} ${slideAnimationLeft && 'card-slider-left'} d-flex flex-row flex-nowrap justify-content-center align-items-center`}
            >
              {
                  slicedCard.map((card,index)=>
                      {
                        return <CardComponent key={index} cardProp={card}/> 
                      }
                  )
                }
           </div>

           <div 
            className={`d-flex flex-row flex-nowrap justify-content-between align-items-center`}
            >
           <button id={"prev"} onClick={prevSlide} style={{paddingRight: `${buttonPositionGap}`,transform: `translate(-30px`}} className={              
            buttonPosition=== 'middle'?
            'border-0 bg-transparent position-absolute top-50 top-50 start-50':
            buttonPosition === 'middle-bottom'?
            'border-0 bg-transparent position-absolute top-100 start-50':
            buttonPosition === 'middle-top'?
            'border-0 bg-transparent position-absolute top-0 pb-5 mb-3 start-50':
            'border-0 bg-transparent position-absolute top-50 start-0 translate-middle-y'}>
              {
                LeftSvgIcon ? <LeftSvgIcon />:
                <svg className='prev-btn rounded-circle' width={`${buttonWidth || '54px'}`} height={`${buttonHeight || '54px'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM13.79 15C14.08 15.29 14.08 15.77 13.79 16.06C13.64 16.21 13.45 16.28 13.26 16.28C13.07 16.28 12.88 16.21 12.73 16.06L9.2 12.53C8.91 12.24 8.91 11.76 9.2 11.47L12.73 7.94C13.02 7.65 13.5 7.65 13.79 7.94C14.08 8.23 14.08 8.71 13.79 9L10.79 12L13.79 15Z" fill={`${buttonColor || '#000000'}`}></path> </g></svg>
              }
            
           </button>
           <button onClick={nextSlide} style={{paddingLeft: `${buttonPositionGap}`,transform: `translate(30px`}} className={              
            buttonPosition=== 'middle'?
            'next border-0 bg-transparent position-absolute top-50 start-50':
            buttonPosition === 'middle-bottom'?
            'next border-0 bg-transparent position-absolute top-100 start-50':
            buttonPosition === 'middle-top'?
            'next border-0 bg-transparent position-absolute top-0 pb-5 mb-3 start-50':
            'next border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y'}>
              {RightSvgIcon ? <RightSvgIcon />:
              <svg className=' rounded-circle' width={`${buttonWidth || '54px'}`} height={`${buttonHeight || '54px'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z" fill={`${buttonColor || '#000000'}`}></path> </g></svg>
              }
            </button>
           </div>

        </div>
  </div>
)
}

export default CardSlider
