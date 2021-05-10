import { React, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginTop: '5px',
        marginBottom: '5px',
    },
    box: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const AuthForm = (props) => {
    const classes = useStyles();
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
            <form className={classes.root} onSubmit={handleSubmitForm}>
                <FormControl className={classes.formControl} fullWidth>
                    <TextField
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        defaultValue={email}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <TextField
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Password"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                        defaultValue={password}
                        required
                    />
                </FormControl>
                {props.signUp &&
                    <FormControl className={classes.formControl} fullWidth>
                        <TextField
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={handleConfirmPwdChange}
                            defaultValue={confirmPassword}
                            required
                        />
                    </FormControl>
                }
                <FormControl className={classes.formControl} fullWidth>
                    <Button type="submit" variant="contained" size="large" color="primary">
                        {props.signUp ? "Sign Up" : "Sign In"}
                    </Button>
                </FormControl>
            </form>
        </div>
    );
};

export default AuthForm;