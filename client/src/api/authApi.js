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