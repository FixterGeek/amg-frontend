import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

function CourseCheck({ onChecked }) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(c => {
      if (onChecked) onChecked(!c);
      return !c;
    });
  };

  return (
    <div className="events-reusables-course-check">
      <Icon
        type="check-circle"
        className={`icon ${checked && 'active'}`}
        onClick={handleClick}
      />
    </div>
  );
}

export default CourseCheck;

CourseCheck.propTypes = {
  onChecked: PropTypes.func,
};

CourseCheck.defaultProps = {
  onChecked: null,
};
