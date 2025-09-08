import { EllipsisVertical } from 'lucide-react';
import React from 'react'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

    const isAuthenticated = localStorage.getItem('accessToken')? true : false;

    if(!isAuthenticated)
    {
        return <Navigate to='/' ></Navigate>
    }
    else
        return children;
    
}

export default ProtectedRoute
