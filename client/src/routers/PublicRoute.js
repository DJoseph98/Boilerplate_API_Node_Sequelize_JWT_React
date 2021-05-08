import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* Route public permettant de rediriger comme on le souhaite, ici en fonction de logged ou non */
export const PublicRoute = ({
    component: Component/* destructure le component passer dans la route de base */,
    ...rest /* spread operator pour récupérer toute ce qui reste comme paramètre dans rest */
}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? ( /* redirect to dashboard if logged */
                <Redirect to="/" />
            ) : ( /* displayu login page if not logged */
                <Component {...props} />
            )
        )} />
    )
}

export default PublicRoute;