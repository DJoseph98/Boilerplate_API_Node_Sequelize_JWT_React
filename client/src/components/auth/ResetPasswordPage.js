import { React, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ResetPassword } from '../../api/authApi';

const ResetPasswordPage = () => {
    const { id } = useParams()
    const history = useHistory();
    const [new_password, setNewPassword] = useState('')
    const [conf_password, setConfPassword] = useState('')
    const [message, setMessage] = useState('')
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value)
    }
    const handleConfirmPwdChange = (e) => {
        setConfPassword(e.target.value)
    }
    const submitForm = async (e) => {
        e.preventDefault()
        let newFormData = new FormData(e.target);
        newFormData.append('token', id);
        const { error, message } = await ResetPassword(Object.fromEntries(newFormData))
        if(!error)
            history.push('/login')
        setMessage(message)
    }
    return (
        <div>
            <form className="form" onSubmit={submitForm}>
                {message && <p>{message}</p>}
                <input className="text-input" type="password" name="newPassword" autoComplete="off" placeholder="Password" value={new_password} onChange={handlePasswordChange} required></input>
                <input className="text-input" type="password" name="confirmPassword" autoComplete="off" placeholder="Password confirmation" value={conf_password} onChange={handleConfirmPwdChange} required></input>
                <button className="button">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;