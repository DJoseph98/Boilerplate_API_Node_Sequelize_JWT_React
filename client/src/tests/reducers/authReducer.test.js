import authReducer from '../../reducers/authReducer'

describe('auth reducer', () => {
    it('should set status Auth login', () => {
        const action = {
            type: 'LOGIN',
            token: '123'
        }
        const result = authReducer({}, action)
        expect(result).toStrictEqual(
            {
                isAuthenticated: true,
                token: '123'
            })
    })
    it('should set status Auth logout', () => {
        const action = {
            type: 'LOGOUT'
        }
        const result = authReducer({}, action)
        expect(result).toStrictEqual(
            {
                isAuthenticated: false,
                token: ''
            })
    })
})