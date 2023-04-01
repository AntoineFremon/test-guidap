const crypto = require('crypto');

const password = 'antoine';

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

console.log('salt: ', salt);
console.log('hash: ', hash);
