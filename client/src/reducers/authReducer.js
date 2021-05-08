const defaultAuthState = {
    isAuthenticated: false,
    token: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultAuthState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                token: action.token
            }
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                token: ''
            }
        default:
            return state
    }
}