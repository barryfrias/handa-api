'use strict';

let o_o = require('yield-yield'),
    oauth = require('oauth-token');

let defaultOptions =
{
    salt: 'n02Outsourc1ng',
    ttl: -1,
    checkAppSecret: function (appId, appSecret, cb) { return Promise.resolve(true) }, // Function for verifying validity of the application secret key
    checkUserSecret: function (userId, userSecret, cb) { return Promise.resolve(true) }, // Function for verifying validity of the user secret key
    checkSession: function (sessionId, cb) { return Promise.resolve(true) } // Function for verifying the session existence
}

let crypt = oauth(defaultOptions);

let encode = o_o(function *(val)
{
    let output = yield crypt.create({userId: val});
    return output.access_token;
})

let decode = o_o(function *(val)
{
    let decoded = yield crypt.decode(val);
    return decoded.userId;
});

module.exports =
{
    encode: encode,
    decode: decode
}