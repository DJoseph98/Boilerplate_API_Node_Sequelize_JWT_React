import React from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';

const WaitingEmailPage = () => {
    const location = useLocation()
    const history = useHistory()
    return (
        <Box style={{ marginTop: '100px' }}>
            {location.state !== undefined
                ? <span>A confirm email has been sent to {location.state.email}</span>
                : history.push('/login')}
        </Box>
    );
};

export default WaitingEmailPage;
