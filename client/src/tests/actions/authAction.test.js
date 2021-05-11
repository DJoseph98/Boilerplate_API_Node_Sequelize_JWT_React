import { logout, setAuth } from '../../actions/authAction'


describe('action reducer', () => {
    it('should generate setAuth action object', () => {
        const token = '123'
        const result = setAuth(token)
        expect(result).toStrictEqual({
            type: 'LOGIN',
            token: '123'
        })
    })

    it('should generate logout action object', () => {
        const result = logout()
        expect(result.type).toBe('LOGOUT')
    })
})