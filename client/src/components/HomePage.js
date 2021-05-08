import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authAction';
import { fetchUser } from '../api/authApi';

const HomePage = () => {
    const dispatch = useDispatch();
    const logouts = () => {
        dispatch(logout())
    }
    return (
        <div>
            Tu est connecter magueule
            <button onClick={logouts}>Logout</button>
        </div>
    );
};

export default HomePage;