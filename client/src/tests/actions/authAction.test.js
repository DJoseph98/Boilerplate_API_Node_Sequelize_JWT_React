import { login, logout } from '../../actions/authAction'

describe('action reducer', () => {
    it('should generate login action object', () => {
        const result = login()
        expect(result.type).toBe('LOGIN')
    })
    it('should generate logout action object', () => {
        const result = logout()
        expect(result.type).toBe('LOGOUT')
    })
})