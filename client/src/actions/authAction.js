import { SignIn } from '../api/authApi'

export const setAuth = (token) => ({
    type: 'LOGIN',
    token
})

export const login = ({ email, password }) => {
    return async (dispatch) => {
        const {error, message, token } = await SignIn(email, password)
        if (error) {
            return message
        }
        return dispatch(setAuth(token))
    }
}

export const logout = (req, res) => ({
    type: 'LOGOUT'
})