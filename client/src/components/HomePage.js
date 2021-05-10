import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authAction';

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