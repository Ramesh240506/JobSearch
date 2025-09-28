import { EllipsisVertical } from 'lucide-react';
import React from 'react'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children,allowedRoles}) => {

    const isAuthenticated = localStorage.getItem('accessToken')? true : false;
    const role = localStorage.getItem('role');
    if(allowedRoles && !allowedRoles.includes(role))
    {
        return <Navigate to='/jobhome' ></Navigate>
    }
    if(!isAuthenticated)
    {
        return <Navigate to='/' ></Navigate>
    }
    else
        return children;
    
}

export default ProtectedRoute
