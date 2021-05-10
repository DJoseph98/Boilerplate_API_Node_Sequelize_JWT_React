import axios from 'axios';

export const fetchUser = async (token) => {
    console.log('test')
    try {
        const response = await axios.get(`http://localhost:8000/api/users/fetchUser`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
        return response.data.user
    } catch (error) {
        return undefined
    }
}

export const SignIn = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/users/login`, { email, password })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const SignUp = async ({ email, password, confirmPassword }) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/users/signup`, { email, password, confirmPassword })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const ConfirmEmail = async (token) => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/users/activate/` + token)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const ForgotPassword = async ({ email }) => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/users/forgot`, { email })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const ResetPassword = async ({ token, newPassword, confirmPassword }) => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/users/reset`, { token, newPassword, confirmPassword })
        return response.data
    } catch (error) {
        return error.response.data
    }
}