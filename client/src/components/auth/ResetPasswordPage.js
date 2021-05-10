import { React, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ResetPassword } from '../../api/authApi';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: '5px',
        marginBottom: '5px',
    },
    box: {
        marginTop: '100px'
    }
}));

const ResetPasswordPage = () => {
    const classes = useStyles();
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
        <Box className={classes.box}>
        <form className="form" onSubmit={submitForm}>
            {message && <p>{message}</p>}
            <FormControl className={classes.formControl} fullWidth>
                <TextField
                    type="password"
                    label="New Password"
                    name="newPassword"
                    placeholder="New password"
                    variant="outlined"
                    value={new_password}
                    onChange={handlePasswordChange}
                    required
                />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
                <TextField
                    type="password"
                    label="Password confirmation"
                    name="confirmPassword"
                    placeholder="Password confirmation"
                    variant="outlined"
                    value={conf_password}
                    onChange={handleConfirmPwdChange}
                    required
                />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
                <Button type="submit" variant="contained" size="large" color="primary">Reset my password</Button>
            </FormControl>
        </form>
    </Box>
    );
};

export default ResetPasswordPage;