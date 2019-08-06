import React from 'react'
import FullScreenContainer from '../atoms/layout/FullScreenContainer';
import AdminRouter from '../routes/AdminRouter';
import LateralMenu from '../organisms/LateralMenu';

const AdminDashboard = () => {
    return (
        <FullScreenContainer alignItems="flex-start">            
            <AdminRouter />
            <LateralMenu />
        </FullScreenContainer>  
    )
}

export default AdminDashboard
