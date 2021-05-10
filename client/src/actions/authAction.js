import { SignIn } from '../api/authApi'

export const setAuth = (token, user) => ({
    type: 'LOGIN',
    token,
    user
})

export const login = ({ email, password }) => {
    return async (dispatch) => {
        const {error, message, token, id } = await SignIn(email, password)
        if (error) {
            return message
        }
        dispatch(setAuth(token, id))
    }
}

export const logout = (req, res) => ({
    type: 'LOGOUT'
})