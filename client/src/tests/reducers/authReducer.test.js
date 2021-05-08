import authReducer from '../../reducers/authReducer'

describe('auth reducer', () => {
    it('should set status Auth login', () => {
        const action = {
            type: 'LOGIN'
        }
        const result = authReducer({}, action)
        expect(result.isAuthenticated).toBe(true)
    })
    it('should set status Auth logout', () => {
        const action = {
            type: 'LOGOUT'
        }
        const result = authReducer({}, action)
        expect(result.isAuthenticated).toBe(false)
    })
})