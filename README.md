# Overview
The SliderForCards library is a customizable and responsive React component designed for displaying a set of cards in a sliding carousel. This library is highly flexible, allowing you to define the content, number of cards per view, and various other configurations to suit your needs.

## Features

## Responsive Design:
Automatically adjusts the number of cards displayed per view based on the screen size.
## Customizable:
Accepts custom card components and allows configuration of various properties like the number of cards per view and button colors.
## Auto Arrangement:
Dynamically arranges cards based on the current index, providing a seamless sliding experience.
#Interactive Navigation:
Provides navigation buttons to slide cards forward and backward.

**Props**


**array (Required)**: An array of objects representing the content of your cards. Each object should have properties like id, title, and potentially others for custom content that your CustomCard component will render.

**cardNumPerView (Optional)**: Controls the number of cards displayed per view.

**autoArrange (Optional, default: true)**: Enables automatic adjustment of the number of cards displayed based on screen size for a responsive layout. This overrides cardNumPerView when enabled.

**buttonColor (Optional, default: '#000000')**: Sets the color of the navigation buttons.

**buttonWidth (Optional, default: '54px')**: Sets the width of the navigation buttons (CSS measurement).

**buttonHeight (Optional, default: '54px')**: Sets the height of the navigation buttons (CSS measurement).

**CustomCard**: This is where you render your custom card component. It receives any props you pass within the **<CustomCard>** tag. Refer to the implementation of your CustomCard component for specific prop usage.

**Usage**
Here is an example of how to use the SliderForCards component in your React application:

import React from 'react';

import {CardSlider} from './CardSlider';

import CustomCard from './CustomCard'; **// Your custom card component**

const cardData = [

  { id: 1, title: 'Card 1', content: 'Content 1' },

  { id: 2, title: 'Card 2', content: 'Content 2' },

  { id: 3, title: 'Card 3', content: 'Content 3' },

  // Add more card data here
];

function App() {
  return (

    <div className="App">

      <CardSlider

        array={cardData}

        cardNumPerView={3} or autoArrange={true}

        buttonColor="#ff5733"

        buttonWidth="50px"

        buttonHeight="50px"
      >
      
        <CustomCard additionalProp="value" />

      </CardSlider>

    </div>
  );
}

export default App; 
## Details

**Dynamic Screen Size Handling**
The component dynamically adjusts the number of cards displayed based on the screen size. It uses breakpoints to define the number of cards per view:

**Extra Small**: 1 card
**Small**: 2 cards
**Medium**: 3 cards
**Large**: 4 cards

# Auto Arrangement
The autoArrange prop ensures that the cards are rearranged dynamically as the user navigates through the carousel. This provides a smooth and continuous sliding experience.

# Navigation Buttons
The component includes "next" and "previous" buttons for navigating through the cards. The button color can be customized using the buttonColor prop.
