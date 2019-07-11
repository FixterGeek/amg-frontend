import React from 'react';

import { Input } from 'antd';

function Publisher() {
  const { Search } = Input;

  return (
    <div className="publisher">
      <Search enterButton="Publicar" placeholder="Cuéntanos algo" />
    </div>
  );
}

export default Publisher;
