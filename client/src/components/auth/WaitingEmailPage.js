import React from 'react';
import { useLocation } from "react-router-dom";

const WaitingEmailPage = (props) => {
    const location = useLocation();
    return (
        <div>
            A confirm email has been sent to {location.state.email}
        </div>
    );
};

export default WaitingEmailPage;