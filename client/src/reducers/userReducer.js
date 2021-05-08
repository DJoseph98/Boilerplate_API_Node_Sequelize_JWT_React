const defaultUserState = {
    id: '',
    token: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultUserState, action) => {
    switch (action.type){
        case 'SET_USER':
            return {
                id: action.id,
                token: action.token
            }
        default:
            return state
    }
}