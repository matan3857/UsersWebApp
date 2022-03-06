const initialState = {
    users: [],
    filterBy: {
        email: '',
        name: '',
        location: '',
        id:''
    },
}
export function userReducer(state = initialState, action) {
    var newState = state;
    var users

    switch (action.type) {
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break
        case 'ADD_USER':
            newState = { ...state, users: [action.user, ...state.users] }
            break
        case 'UPDATE_USER':
            users = state.users.map(user => (user.id.value === action.user.id.value) ? action.user : user)
            newState = { ...state, users }
            break
        case 'REMOVE_USER':
            users = state.users.filter(user => user.id.value !== action.userId)
            newState = { ...state, users }
            break
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
            break

        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;
}
