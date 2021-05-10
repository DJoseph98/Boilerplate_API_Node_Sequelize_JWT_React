import { React, useState } from 'react';
import { ForgotPassword } from '../../api/authApi';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const submitForm = async (e) => {
        e.preventDefault()
        let newFormData = new FormData(e.target);
        const { message } = await ForgotPassword(Object.fromEntries(newFormData))
        setMessage(message)
    }
    return (
        <div>
            <form className="form" onSubmit={submitForm}>
                {message && <p>{message}</p>}
                <input className="text-input" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required></input>
                <button className="button">Send Reset Email</button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;