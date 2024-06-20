import React from 'react'
import 'bootstrap'; // Import Bootstrap's JavaScript if needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS
import './styles/slidercardcss.css'
function CardSlider({array, CardComponent, cardNumPerView,autoArrange,buttonColor,buttonWidth,buttonHeight}) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [screenSize, setScreenSize] = React.useState(getBreakpoint());
    const [slicedCard, setSlicedCard] = React.useState([]);
    const [slideAnimation, setSlideAnimation] = React.useState(false);
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
        setSlideAnimation(true);
        setTimeout(()=>{
          setSlideAnimation(false);
        },780)
      };
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? array.length-(autoArrange ? screenSize : cardNumPerView) : prevIndex - 1
        );
        setSlideAnimation(true);
        setTimeout(()=>{
          setSlideAnimation(false);
        },780)
      };
    
      React.useEffect(()=>{
        let rearrangeFruits = (currentIndex) => {
          let part1 = array.slice(currentIndex, currentIndex+(autoArrange ? screenSize : cardNumPerView)).slice(-(autoArrange ? screenSize : cardNumPerView));
          let part2 = array.slice(-currentIndex%1, currentIndex%1).slice(-currentIndex%1);
          let result = part1.concat(part2);
          return result;
        };
        setSlicedCard(rearrangeFruits(currentIndex).slice(-(autoArrange ? screenSize : cardNumPerView)));
      },[currentIndex,screenSize])
      
  return (
    <div className='my-5'>
          <div className='position-relative'>
             <div className={`${slideAnimation && 'card-slider'} d-flex flex-row flex-nowrap justify-content-center align-items-center gap-3`}>
             {
                slicedCard.map((card,index)=>
                    {
                      return <CardComponent key={index} cardProp={card}/> 
                    }
                )
              }
             </div>
             <button onClick={prevSlide} className={' border-0 bg-transparent position-absolute top-50 start-0 translate-middle-y'}>
               <svg className='prev-btn rounded-circle' width={`${buttonWidth || '54px'}`} height={`${buttonHeight || '54px'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM13.79 15C14.08 15.29 14.08 15.77 13.79 16.06C13.64 16.21 13.45 16.28 13.26 16.28C13.07 16.28 12.88 16.21 12.73 16.06L9.2 12.53C8.91 12.24 8.91 11.76 9.2 11.47L12.73 7.94C13.02 7.65 13.5 7.65 13.79 7.94C14.08 8.23 14.08 8.71 13.79 9L10.79 12L13.79 15Z" fill={`${buttonColor || '#000000'}`}></path> </g></svg>
             </button>
             <button onClick={nextSlide} className=' border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y'>
               <svg className='next-btn rounded-circle' width={`${buttonWidth || '54px'}`} height={`${buttonHeight || '54px'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z" fill={`${buttonColor || '#000000'}`}></path> </g></svg>
             </button>
          </div>
    </div>
  )
}

export default CardSlider
