import React from "react";

import AdminRouter from "../routes/AdminRouter";
import FullScreenContainer from "../atoms/layout/FullScreenContainer";
import LateralAdminMenu from "../organisms/LateralAdminMenu";

function DashBoard() {
  return (
    <FullScreenContainer alignItems="flex-start">
      <AdminRouter />
      <LateralAdminMenu />
    </FullScreenContainer>
  );
}

export default DashBoard;
