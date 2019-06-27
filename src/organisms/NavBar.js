import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

function NavBar() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      position: 'absolute', top: '0', left: '0', right: '0',
      padding: '32px 44px', boxSizing: 'border-box',
    }}>
      <span style={{ color: 'white', fontSize: '1.2em' }}>Asociación Mexicana de Gastroenterología</span>
      <Link
        to="/login"
        style={{ color: 'white', fontSize: '1.2em' }}>
        Iniciar sesión
      </Link>
    </div>
  );
}

export default NavBar;
