const crypto = require('crypto');

function base64urlEncode(data) {
    return Buffer.from(data).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function signJWT(payload, secret, expiresInSeconds = 3600) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const payloadWithExp = { ...payload, exp };

    const encodedHeader = base64urlEncode(JSON.stringify(header));
    const encodedPayload = base64urlEncode(JSON.stringify(payloadWithExp));

    const signature = crypto.createHmac('sha256', secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest();
    const encodedSignature = base64urlEncode(signature);

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function verifyJWT(token, secret) {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token');

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = crypto.createHmac('sha256', secret)
        .update(signatureInput)
        .digest();
    const expectedEncodedSignature = base64urlEncode(expectedSignature);

    if (encodedSignature !== expectedEncodedSignature) {
        throw new Error('Invalid signature');
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
    if (payload.exp <= Math.floor(Date.now() / 1000)) {
        throw new Error('Token expired');
    }

    return payload;
}

module.exports = { signJWT, verifyJWT };