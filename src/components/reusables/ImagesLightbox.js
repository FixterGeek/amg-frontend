import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'fslightbox-react';

function ImagesLightBox({imagesArray, children, itemKey}) {
  const [openBox, setOpenBox] = useState(false);
  console.log(openBox)

  return (
    <div className="reusables-images-lightbox">
      <button
        className="reusables-images-lightbox-open-button"
        type="button"
        onClick={() => setOpenBox(!openBox)} >
        { children }
      </button>
      <Lightbox
        toggler={openBox}
        sources={[...imagesArray]}
        key={itemKey}
      />
    </div>
  );
}

export default ImagesLightBox;

ImagesLightBox.propTypes = {
  imagesArray: PropTypes.array,
  currentIndex: PropTypes.number,
}

ImagesLightBox.defaultProps = {
  imagesArray: [],
  currentIndex: 0,
}
