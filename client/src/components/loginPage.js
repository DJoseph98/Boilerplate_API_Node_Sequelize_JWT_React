import React from 'react';
import { connect } from 'react-redux';
import { startLoginGoogle, startLoginFacebook } from '../actions/auth';
import TabsLogin from './tabsLogin';

export const LoginPage = ({ startLoginGoogle, startLoginFacebook }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <TabsLogin />
            <div className="buttons_login">
                <button className="button" onClick={startLoginGoogle}>Connect with Google</button>
                <button className="button" onClick={startLoginFacebook}>Connect with Facebook</button>
            </div>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginGoogle: () => dispatch(startLoginGoogle()),
    startLoginFacebook: () => dispatch(startLoginFacebook())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);