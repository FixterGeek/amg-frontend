import React from 'react';
import PropTypes from 'prop-types';

import { Input, Form } from 'antd';

function SearchField({ label, onSearch, fullWidth }) {
  const { Item } = Form;
  const { Search } = Input;

  const handleSearch = (value) => {
    if (onSearch) onSearch(value);
  };

  return (
    <Item label={label} className="reusables-search-field">
      <Search onSearch={handleSearch} className={ fullWidth ? 'full-width' : '' } />
    </Item>
  )
}

export default SearchField;

SearchField.propTypes = {
  fullWidth: PropTypes.bool,
};

SearchField.defaultProps = {
  fullWidth: false,
};
