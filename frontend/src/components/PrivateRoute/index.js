import React from 'react'
import { Navigate } from 'react-router';
import { useLocalState } from '../../util/useLocalStorage';
import SignIn from '../pages/SignIn';

const PrivateRoute = ( {children} ) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? children : <Navigate to="/login"  />

};

export default PrivateRoute