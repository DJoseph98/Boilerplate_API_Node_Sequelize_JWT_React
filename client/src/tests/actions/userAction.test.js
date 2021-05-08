import { setUserState } from '../../actions/userAction'

describe('user action', () => {
    it('should generate user action object', () => {
        const id = '123456'
        const token = 'dlkz_qzujf,na1752'
        const result = setUserState(id, token)
        expect(result).toStrictEqual({
            type: 'SET_USER',
            id,
            token
        })
    })
})