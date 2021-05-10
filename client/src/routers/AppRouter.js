import React from 'react';
import NotFoundPage from '../components/NotFoundPage';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthTabs from '../components/auth/AuthTabs';
import HomePage from '../components/HomePage';
import ConfirmEmailPage from '../components/auth/ConfirmEmailPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import WaitingEmailPage from '../components/auth/WaitingEmailPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import ResetPasswordPage from '../components/auth/ResetPasswordPage';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/login' component={AuthTabs}></PublicRoute>
                    <PublicRoute exact path='/email_sended' component={WaitingEmailPage}></PublicRoute>
                    <PublicRoute exact path='/reset_password/:id' component={ResetPasswordPage}></PublicRoute>
                    <PublicRoute exact path='/forgot_password' component={ForgotPasswordPage}></PublicRoute>
                    <PrivateRoute exact path='/' component={HomePage}></PrivateRoute>
                    <PublicRoute exact path='/confirm_email/:id' component={ConfirmEmailPage}></PublicRoute>
                    <PublicRoute component={NotFoundPage}></PublicRoute>
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;