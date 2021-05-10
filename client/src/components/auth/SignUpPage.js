import { React, useState } from 'react';
import AuthForm from './AuthForm';
import { useHistory } from "react-router-dom";
import { SignUp } from '../../api/authApi';

const SignUpPage = () => {
    const [message, setMessage] = useState('')
    const history = useHistory();
    const onSubmit = async (formData) => {
        const {error, message } = await SignUp(formData)
        if (!error) {
            history.push({
                pathname: '/email_sended',
                state: { email: formData.email }
            })
        } else {
            setMessage(message)
        }
    }
    return (
        <div>
            {message && <p>{message}</p>}
            <AuthForm onSubmit={onSubmit} signUp={true} />
        </div>
    );
};

export default SignUpPage;