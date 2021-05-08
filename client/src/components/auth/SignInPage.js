import React from 'react';
import AuthForm from './AuthForm';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authAction';
import { useHistory } from "react-router-dom";

const SignInPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const onSubmit = async (formData) => {
        const error = await dispatch(login(formData))
        if(!error) {
            history.push('/')
        }
    }
    return (
        <div>
            <AuthForm onSubmit={onSubmit} />
        </div>
    );
};

export default SignInPage;