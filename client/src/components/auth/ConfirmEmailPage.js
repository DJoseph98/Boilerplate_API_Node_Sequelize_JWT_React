import React from 'react';
import { useParams } from 'react-router-dom';

const ConfirmEmailPage = () => {
    const { id } = useParams()
    return (
        <div>
            ConfirmEmailPage with id : { id }
        </div>
    );
};

export default ConfirmEmailPage;