import { React, useState } from 'react';
import AuthForm from './AuthForm';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authAction';
import { useHistory, Link } from "react-router-dom";

const SignInPage = () => {
    const [error, setError] = useState(undefined);
    const history = useHistory();
    const dispatch = useDispatch();
    const onSubmit = async (formData) => {
        const error = await dispatch(login(formData))
        if (!error) {
            history.push('/')
        } else {
            setError(error)
        }
    }
    return (
        <div>
            {error && <p>{error}</p>}
            <AuthForm onSubmit={onSubmit} />
            <Link to='/forgot_password'>Reset password</Link>
        </div>
    );
};

export default SignInPage;