import React from 'react';
import NotFoundPage from '../components/NotFoundPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthTabs from '../components/auth/AuthTabs';
import HomePage from '../components/HomePage';
import ConfirmEmailPage from '../components/auth/ConfirmEmailPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/login' component={AuthTabs}></PublicRoute>
                    <PrivateRoute exact path='/' component={HomePage}></PrivateRoute>
                    <PublicRoute exact path='/login/confirm_email/:id' component={ConfirmEmailPage}></PublicRoute>
                    <PublicRoute component={NotFoundPage}></PublicRoute>
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;