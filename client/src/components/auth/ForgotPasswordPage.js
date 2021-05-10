import { React, useState } from 'react';
import { ForgotPassword } from '../../api/authApi';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: '5px',
        marginBottom: '5px',
    },
    box: {
        marginTop: '100px'
    }
}));

const ForgotPasswordPage = () => {
    const classes = useStyles();
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
        <Box className={classes.box}>
        {message && <div>
            {message}
            <p><Link to='/login'>Back to login page</Link></p>
            </div>}
        {!message && 
            <form className="form" onSubmit={submitForm}>
                <FormControl className={classes.formControl} fullWidth>
                    <TextField
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <Button type="submit" variant="contained" size="large" color="primary">Forgot my password</Button>
                </FormControl>
            </form>
        }
        </Box>
    );
};

export default ForgotPasswordPage;