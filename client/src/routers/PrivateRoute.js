import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* Route privée permettant de rediriger comme on le souhaite, ici en fonction de logged ou non */
export const PrivateRoute = ({
    component: Component/* destructure le component passer dans la route de base */,
    ...rest /* spread operator pour récupérer toute ce qui reste comme paramètre dans rest */
}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Component {...props} />
                </div>

            ) : (
                <Redirect to="/login" />
            )
        )} />
    )
};

export default PrivateRoute;