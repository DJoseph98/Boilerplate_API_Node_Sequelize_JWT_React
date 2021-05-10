import { React, useState } from 'react';
import AuthForm from './AuthForm';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authAction';
import { useHistory, Link } from "react-router-dom";
import Box from '@material-ui/core/Box';

const SignInPage = () => {
    const [error, setError] = useState(undefined)
    const history = useHistory()
    const dispatch = useDispatch()
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
            <Box display='flex' justifyContent='center'>
                Forgot your password ?  <Link to='/forgot_password'> Reset password</Link>
            </Box>
        </div>
    );
};

export default SignInPage;