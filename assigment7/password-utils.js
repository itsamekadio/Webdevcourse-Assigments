const crypto = require('crypto');

function hashPassword(password) {
    const salt = crypto.randomBytes(16);
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

function verifyPassword(password, storedHash) {
    const [saltHex, hashHex] = storedHash.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const hash = Buffer.from(hashHex, 'hex');
    const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    return crypto.timingSafeEqual(hash, computedHash);
}

module.exports = { hashPassword, verifyPassword };