'use strict';

let o_o = require('yield-yield'),
    database = require('./database.js');

const GET_TOKEN='begin get_token(:mobile_num, :token); end;';

let getToken = o_o(function *(mobile_num)
{
    let bindvars =
    {
         mobile_num: mobile_num,
         token: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
    };

    let result = yield database.executeProc(GET_TOKEN, bindvars, {}, false, yield);
    return result.token;
});

const CHECK_TOKEN='begin check_token(:token, :status); end;';

let checkToken = o_o(function *(token)
{
    let bindvars =
    {
        token: token,
        status: { type: database.oracle.NUMBER, dir: database.oracle.BIND_OUT }
    };

    let result = yield database.executeProc(CHECK_TOKEN, bindvars, {}, false, yield);
    return result.status;
});

const DELETE_TOKEN='begin delete_token(:token); end;';

let deleteToken = o_o(function *(token)
{
    let bindvars =
    {
        token: token
    };

    let result = yield database.executeProcNoResult(DELETE_TOKEN, bindvars);
});

module.exports =
{
    getToken: getToken,
    checkToken: checkToken,
    deleteToken: deleteToken
};