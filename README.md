# cards-slider-react-lib
cards-slider-react-lib is a customizable and responsive React component designed for displaying a set of cards in a sliding carousel. This library is highly flexible, allowing you to define the content, number of cards per view, and various other configurations to suit your needs.

# Features

**Responsive Design**: Automatically adjusts the number of cards displayed per view based on the screen size.

**Customizable**: Accepts custom card components and allows configuration of various properties like the number of cards per view and button colors.

**Auto Arrangement**: Dynamically arranges cards based on the current index, providing a seamless sliding experience.

**Interactive Navigation**: Provides navigation buttons to slide cards forward and backward.

**Installation**
You can install `cards-slider-react-lib` using npm:

`npm install cards-slider-react-lib`

**Props**

**array (Required)**: An array of objects representing the content of your cards. Each object should be unique, and these object properties are available as props in your `CustomCard` component.

**cardNumPerView (Optional)**: Controls the number of cards displayed per view.

**autoArrange (Optional, default: false)**: Enables automatic adjustment of the number of cards displayed based on screen size for a **responsive layout. This overrides cardNumPerView when enabled.

**buttonColor (Optional, default: '#000000')**: Sets the color of the navigation buttons.

**buttonWidth (Optional, default: '54px')**: Sets the width of the navigation buttons (CSS measurement).

**buttonHeight (Optional, default: '54px')**: Sets the height of the navigation buttons (CSS measurement).

**CustomCard**: This is where you render your custom card component. It receives any props you pass within the `<CustomCard>` tag. Refer to the implementation of your CustomCard component for specific prop usage.

**LeftSvgIcon**: This SVG icon overrides the default left SVG icon.

**RightSvgIcon**: This SVG icon overrides the default right SVG icon.

**slideTimeInterval**: The number passed here is used to set an interval at which the slider auto-slides infinitely. Default is `3240`.

**allowSlidePerInterval**: When enabled to true, it allows auto-sliding without clicking next/prev icon, also pausing the auto-sliding if hovering over the slider to increase performance.

**cardSpacing**: This is used to give space to each card or image-card for customized display **"gap"**.

**buttonPosition**: Used to position the button around the slider: `middle`, `middle-bottom`, or `middle-top`. Default is positioned at the `right` and `left end` of the slider container.

**buttonPositionGap**: When a value is passed here, it gives space to the navigation button relative to the `buttonPosition`.

**cutOneCardPerView**: When set to true, it removes only one card per slide. Otherwise, it removes cards corresponding to the `autoArrange` or `cardNumPerView`.

**CustomCard Example Usage**

```
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/cardcss.css'

function CustomCard({ cardProp, additionalProp }) {

  return (

    <div className="card p-2" style={{ width: "18rem" }}>

      <img className='card-img-top' src={cardProp.image} alt="" />

      <div className="card-body text-start">
        <button className='border-0 px-2 py-1 rounded-pill mybg-secondary text-dark'>{cardProp.title}</button>

        <h5 className="card-title my-2">{cardProp.content}</h5>

        <p className="card-text">By William</p>

        <Link to={`/courses/${additionalProp}`} className="btn btn-primary rounded-pill">Enroll Now</Link>

      </div>

    </div>
  );
}

export default CustomCard
```

**Usage**
Here is an example of how to use the CardSlider component in your React application:

```
import React from 'react';
import { CardSlider } from 'cards-slider-react-lib';
import CustomCard from './CustomCard'; 

const cardData = [
  { id: 1, title: 'Card 1', content: 'Content 1', image: 'path/to/image1.jpg' },
  { id: 2, title: 'Card 2', content: 'Content 2', image: 'path/to/image2.jpg' },
  { id: 3, title: 'Card 3', content: 'Content 3', image: 'path/to/image3.jpg' },
  // Add more card data here
];

function App() {
  return (
    <div className="App">
      <CardSlider
        array={cardData}
        cardNumPerView={3}
        buttonColor="#ff5733"
        buttonWidth="50px"
        buttonHeight="50px"
        CardComponent={(props) => <CustomCard {...props} additionalProp="1" />}
        LeftSvgIcon={() => /* put svg icon for the left */ or use default by not specifying}
        RightSvgIcon={() => /* put svg icon for the right */ or use default by not specifying}
        slideTimeInterval={1500 or do not specify using default 3240}
        allowSlidePerInterval={true}
        cardSpacing={'30px'}
        buttonPosition={'middle'}
        buttonPositionGap={'10px'}
        cutOneCardPerView={true}
      />
    </div>
  );
}

export default App;
```

**Contributing**

If you would like to contribute to this project, follow these steps:

1. Clone the repository:

`git clone https://github.com/VictorAjadi/cards-slider-react-lib.git`

2. Navigate to the workspace folder:

`cd workspace`
3. Install the dependencies:

`npm install`

4. Run the development server for test:

`npm run dev`

Make your changes and ensure all tests pass.

Feel free to fork this project, submit issues, or make pull requests to enhance its functionality. Any contributions are welcome.

**License**

This project is licensed under the MIT License.

