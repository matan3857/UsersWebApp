import { resolvedGetUsers } from "../store/user.actions";
import { utilService } from "../services/util-service";

export function loadUsers() {
    return async dispatch => {
        try {
            fetch("https://randomuser.me/api/?results=10")
                .then(res => res.json())
                .then(data => dispatch(resolvedGetUsers(utilService.setIdToAllUsers(data.results))))
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}

export const userService = {
    addToUserIdAndImg,
    filterUsers
}

function addToUserIdAndImg(user) {
    const newUser = user
    newUser.id.value = utilService.makeId()
    newUser.picture.medium = `https://randomuser.me/api/portraits/med/women/${utilService.getRandomIntInclusive(0, 99)}.jpg`
    return newUser
}

function filterUsers(users, filterBy) {
    let filteredUsers = users
    if (filterBy.name || filterBy.email || filterBy.id || filterBy.location) {
        filteredUsers = users.filter(user => {
            return (user.name.title + user.name.first + user.name.last).toLowerCase().includes(filterBy.name.toLowerCase())
                && (user.email.startsWith(filterBy.email)) 
                && (user.id.value.startsWith(filterBy.id))
                && ((user.location.country + user.location.city + user.location.street.name + user.location.street.number).toLowerCase().includes(filterBy.location.toLowerCase()))
        })
    }
    return filteredUsers
}