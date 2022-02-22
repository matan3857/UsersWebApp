export const utilService = {
    setIdToAllUsers,
    validateEmail,
    makeId,
    getRandomIntInclusive
}

function setIdToAllUsers(users) {
    users.forEach(user => {
        if (!user.id.value) user.id.value = makeId()
    })
    return users
}

function validateEmail(email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.match(mailformat)) return true
    return false
}

function makeId(length = 8) {
    let txt = '';
    let possible = '0123456789';

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}