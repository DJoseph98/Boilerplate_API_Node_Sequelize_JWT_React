import React from 'react';
import AuthForm from './AuthForm';

const SignUpPage = () => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <AuthForm onSubmit={onSubmit} signUp={true} />
        </div>
    );
};

export default SignUpPage;