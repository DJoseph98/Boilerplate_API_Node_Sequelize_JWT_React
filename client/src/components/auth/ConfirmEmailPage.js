import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ConfirmEmail } from '../../api/authApi';

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
        <div>
            {response && <p>{response}</p>}
            ConfirmEmailPage
            <Link to='/login'>Back to login page</Link>
        </div>
    );
};

export default ConfirmEmailPage;