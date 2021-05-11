import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ConfirmEmail } from '../../api/authApi';
import Box from '@material-ui/core/Box';

const ConfirmEmailPage = () => {
    const { id } = useParams()
    const [response, setResponse] = useState(undefined)
    useEffect(() => {
        const confirmEmail = async () => {
            const { message } = await ConfirmEmail(id)
            setResponse(message)
        }
        confirmEmail()
    }, [id])

    return (
        <Box style={{ marginTop: '100px' }}>
            {response && <p>{response}</p>}
            <Link to='/login'>Back to login page</Link>
        </Box>
    );
};

export default ConfirmEmailPage;