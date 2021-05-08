import userReducer from '../../reducers/userReducer'

describe('user reducer', () => {
    it('should set user when login', () => {
        const action = {
            type: 'SET_USER',
            id: '123456',
            token: '123_456/'
        }
        const result = userReducer({}, action)
        expect(result).toStrictEqual({
            id: action.id,
            token: action.token
        })
    })
    it('should empty user when logout', () => {
        const action = {
            type: 'SET_USER',
            id: '',
            token: ''
        }
        const result = userReducer({}, action)
        expect(result).toStrictEqual({
            id: '',
            token: ''
        })
    })
})