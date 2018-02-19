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

const VERIFY_CODE_PROC='begin roku_device.verify_code(:code, :status, :accountNumber, :emailAddress, :brand); end;';

let verifyCode = o_o(function *(params)
{
    let bindvars =
    {
        code: params.code,
        status: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
        accountNumber: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
        emailAddress: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
        brand: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT }
    };

    let result = yield database.executeProc(VERIFY_CODE_PROC, bindvars, {}, false, yield);
    let output =
    {
        status: 200,
        json: {message: result.status, accountNumber: result.accountNumber, emailAddress: result.emailAddress, brand: result.brand}
    }
    if(result.status === 'INVALID CODE')
    {
        output.status = 404;
    }
    return output;
});

module.exports =
{
    getToken: getToken
};