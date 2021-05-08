import { React, useState } from 'react';

const AuthForm = (props) => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmitForm = (e) => {
        e.preventDefault()
        let newFormData = new FormData(e.target);
        props.onSubmit(Object.fromEntries(newFormData))
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirmPwdChange = (e) => {
        setConfirmPassword(e.target.value);
    }
    return (
        <div>
            <form className="form" onSubmit={handleSubmitForm}>
                {error && <p className="form__error">{error}</p>}
                <input className="text-input" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required></input>
                <input className="text-input" type="password" name="password" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange} required></input>
                {props.signUp &&
                    <input className="text-input" type="password" name="password_confirm" autoComplete="off" placeholder="Password confirmation" value={confirmPassword} onChange={handleConfirmPwdChange} required></input>
                }
                <button className="button">
                    {props.signUp ? "Sign Up" : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;