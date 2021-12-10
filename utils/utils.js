const util = require('util'); 
const bCrypt = require('bcrypt');
const { logger } = require('../config/config');

const print = (obj) => {
    logger.info(util.inspect(obj, false, 12, true));
}

const createHash = (password) => {
    return bCrypt.hashSync(password, 10);
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

const isPrime = num => {
    if ([2, 3].indexOf(num) >= 0) return true;
    else if ([2, 3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while ((i * i) <= num) {
            if (num % i == 0) return false
            i += w
            w = 6 - w
        }
    }
    return true
}

module.exports = {
    print,
    createHash,
    isValidPassword,
    isPrime
}