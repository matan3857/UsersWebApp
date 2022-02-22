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
    addToUserIdAndImg
}

function addToUserIdAndImg(user) {
    const newUser = user
    newUser.id.value = utilService.makeId()
    newUser.picture.medium = `https://randomuser.me/api/portraits/med/women/${utilService.getRandomIntInclusive(0,99)}.jpg`
    return newUser
}