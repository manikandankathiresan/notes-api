const JWT = require('jsonwebtoken');

module.exports = {
    signAccessToken: (username, userid) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId: userid,
                username: username
            };

            const screte = '9c40adc41c20b4adc9e1c4ab52f5cf79408e59cd5e07e77d48adbbe8f9cc6d96'

            // Example options
            const options = {
                expiresIn: '1h',
                algorithm: 'HS256',
                issuer: 'admin@gamil.com',
                audience: 'users'
            };

            JWT.sign(payload, screte, options, (err, token) => {
                if (err) reject(err);
                resolve(token)
            })

        })
    }
}