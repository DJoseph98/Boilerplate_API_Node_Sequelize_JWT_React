import React from 'react';
import AuthTabs from './AuthTabs';

export const AuthPage = () => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <AuthTabs />
            <div className="buttons_login">
                <button className="button">Connect with Google</button>
                <button className="button">Connect with Facebook</button>
            </div>
        </div>
    </div>
);

export default AuthPage;