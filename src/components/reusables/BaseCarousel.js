import React, { useState } from 'react';

function Carousel({
  itemsArray = []
}) {
  const [itemIndex, setItemIndex] = useState(0);

  const CarouselItem = ({ component }) => {
    return (
      <div>
        ok
      </div>
    );
  };

  return (
    <div>
      <button>‹</button>
      <div>
        { itemsArray.length > 1 && (
            <CarouselItem
              component={itemsArray[(itemIndex + itemsArray.length - 1) % itemsArray.length]}
            />
          ) 
        }

        <CarouselItem
          component={itemsArray[itemIndex]}
        />

        { 
          itemsArray.length > 2 && (
            <CarouselItem
              component={itemsArray[(itemIndex + 1) % itemsArray.length]}
            />
          ) 
        }
      </div>
      <button>›</button>
    </div>
  );
}

export default Carousel;
