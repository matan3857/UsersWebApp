import { userService } from '../services/user.service.js';

export const resolvedGetUsers = (users) => {
    return {
        type: 'SET_USERS',
        users
    }
}

export const onAddUser = (user) => {
    const newUser = userService.addToUserIdAndImg(user)
    return {
        type: 'ADD_USER',
        user: newUser
    }
}

export const loadUsers = (users, filterBy) => {
    return (dispatch) => {
        try {
            const filteredUsers = userService.query(users, filterBy)
            dispatch({
                type: "SET_USERS",
                users: filteredUsers,
            });
        }
        catch (err) {
            console.log('cant set users', err)
        }
    }
}

export const onRemoveUser = (userId) => {
    return async dispatch => {
        try {
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export const onUpdateUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'UPDATE_USER',
                user
            })
            return user
        }
        catch (err) {
            console.log('Cannot update user', err)
        }
    }
}

export const setFilterBy = (filterBy) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_FILTER",
                filterBy
            })
            // console.log('filterBy from actions',filterBy)
            // loadUsers(filterBy)(dispatch)
            // return filterBy
        }
        catch (err) {
            console.log('Cannot update filterBy', err)
        }
    }
}
