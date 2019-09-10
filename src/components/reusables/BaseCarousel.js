import React, { useState } from 'react';

function Carousel({
  itemsArray = []
}) {
  const [itemIndex, setItemIndex] = useState(0);

  const CarouselItem = ({ element }) => {
    return (
      <div>
        { element }
      </div>
    );
  };

  return (
    <div className="reusables-base-carousel">
      {
        itemsArray.length > 1 && (
          <button
            className="reusables-base-carousel-button"
            onClick={() => setItemIndex((itemIndex + itemsArray.length - 1) % itemsArray.length)}
          >
            ‹
          </button>
        )
      }

      <div className="reusables-base-carousel-items">
        { itemsArray.length > 1 && (
            <CarouselItem
              element={itemsArray[(itemIndex + itemsArray.length - 1) % itemsArray.length]}
            />
          ) 
        }

        <CarouselItem
          element={itemsArray[itemIndex]}
        />

        { 
          itemsArray.length > 2 && (
            <CarouselItem
              element={itemsArray[(itemIndex + 1) % itemsArray.length]}
            />
          ) 
        }
      </div>

      {
        itemsArray.length > 1 && (
          <button
            className="reusables-base-carousel-button"
            onClick={() => setItemIndex((itemIndex + 1) % itemsArray.length)}
          >
            ›
          </button>
        )
      }
    </div>
  );
}

export default Carousel;
