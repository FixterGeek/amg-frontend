import React from 'react';

import DashBoardRouter from '../routes/DashBoardRouter';
import FullScreenContainer from '../atoms/layout/FullScreenContainer';
import LateralMenu from '../organisms/LateralMenu';

function DashBoard() {
  return (
    <div className="dashboard-screen">
      <DashBoardRouter />
      <LateralMenu />
    </div>
  );
}

export default DashBoard;
