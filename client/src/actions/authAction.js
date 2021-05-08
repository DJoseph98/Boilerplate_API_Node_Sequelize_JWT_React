import { SignIn } from '../api/authApi'

export const setAuth = ({ token, user }) => ({
    type: 'LOGIN',
    token,
    user
})

export const login = ({ email, password }) => {
    return async (dispatch) => {
        const response = await SignIn(email, password)
        if (response.error) {
            return response.message
        }
        dispatch(setAuth(response))
    }
}

export const logout = (req, res) => ({
    type: 'LOGOUT'
})