import React from 'react';

import DashBoardRouter from '../routes/DashBoardRouter';
import FullScreenContainer from '../atoms/layout/FullScreenContainer';
import LateralMenu from '../organisms/LateralMenu';

function DashBoard() {
  return (
    <FullScreenContainer alignItems="flex-start">
      <DashBoardRouter />
      <LateralMenu />
    </FullScreenContainer>
  );
}

export default DashBoard;
