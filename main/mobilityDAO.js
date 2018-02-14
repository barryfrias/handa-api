'use strict';

let o_o = require('yield-yield'),
    database = require('./database.js');

const POLL_PROC='begin roku_device.poll(:command, :esn, :deviceID, :netflix_esn, :code, :status, :accountNumber, :emailAddress, :brand, :roku_username, :access_token, :refresh_token); end;';

let poll = o_o(function *(params)
{
    let bindvars =
    {
         command: params.command,
         esn: params.esn,
         deviceID: params.deviceID,
         netflix_esn: params.netflixDeviceID,
         code: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
         status: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
         accountNumber: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
         emailAddress: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
         brand: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
         roku_username: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
         access_token: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT },
         refresh_token: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT }
    };

    let result = yield database.executeProc(POLL_PROC, bindvars, {}, false, yield);
    return {
        status: 200,
        json: {
            code: result.code,
            status: result.status,
            accountNumber: result.accountNumber,
            emailAddress: result.emailAddress,
            brand: result.brand,
            client_id: "3RJBZ4FPIEK15F6V8291",
            client_secret: "LKOTKIBUGWKZ7YX6IZ45",
            roku_channel_id: conf['roku.channel.id'],
            roku_username: result.roku_username,
            access_token: result.access_token,
            refresh_token: result.refresh_token
        }
    }
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

const GET_ESN_PROC='begin roku_device.get_esn(:code, :esn); end;';

let getEsn = o_o(function *(params)
{
    let bindvars =
    {
            code: params.code,
            esn: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT }
    };

    let result = yield database.executeProc(GET_ESN_PROC, bindvars, {}, false, yield);
    return result.esn;
});

const SHADOW_ACCOUNT_CREATED_PROC='begin roku_device.shadow_account_created(:code, :accountNumber, :emailAddress, :brand, :rokuUsername, :accessToken, :refreshToken); end;';

let shadowAccountCreated = params =>
{
    let bindvars =
    {
        code: params.code,
        accountNumber: params.accountNumber,
        emailAddress: params.emailAddress,
        brand: params.brand,
        rokuUsername: params.rokuUsername,
        accessToken: params.accessToken,
        refreshToken: params.refreshToken
    };
    database.executeProcNoResult(SHADOW_ACCOUNT_CREATED_PROC, bindvars);
};

const ACCOUNT_INELIGIBLE_PROC='begin roku_device.account_ineligible(:code, :accountNumber, :emailAddress, :brand); end;';

let accountIneligible = params =>
{
    let bindvars =
    {
        code: params.code,
        accountNumber: params.accountNumber,
        emailAddress: params.emailAddress,
        brand: params.brand
    };
    database.executeProcNoResult(ACCOUNT_INELIGIBLE_PROC, bindvars);
};

const HAS_ROKU_ALREADY_PROC='begin roku_device.has_roku_already(:accountNumber, :boxCount); end;';

let hasRokuAlready = o_o(function *(accountNumber)
{
    let bindvars =
    {
        accountNumber: accountNumber,
        boxCount: { type: database.oracle.NUMBER, dir: database.oracle.BIND_OUT }
    };
    let result = yield database.executeProc(HAS_ROKU_ALREADY_PROC, bindvars, {}, false, yield);
    return result.boxCount > 0;
});

const ROKU_ACCOUNT_DISCONNECT_PROC='begin roku_account_disconnect(:accountNumber, :esn, :status, :result); end;';

let disconnectAccount = o_o(function *(accountNumber, esn)
{
    let bindvars =
    {
         accountNumber: accountNumber,
         esn: esn,
         status: { type: database.oracle.NUMBER, dir: database.oracle.BIND_OUT },
         result: { type: database.oracle.STRING, dir: database.oracle.BIND_OUT }
    };

    let output = yield database.executeProc(ROKU_ACCOUNT_DISCONNECT_PROC, bindvars, {}, false, yield);
    return output;
});

const ROKU_ACCOUNT_DEVICES_PROC='begin roku_account_devices(:accountNumber, :p_cursor); end;';

let accountDevices = o_o(function *(accountNumber)
{
    let bindvars =
    {
         accountNumber: accountNumber,
         p_cursor: { type: database.oracle.CURSOR, dir: database.oracle.BIND_OUT }
    };

    let output = yield database.executeProc(ROKU_ACCOUNT_DEVICES_PROC, bindvars, {outFormat: database.oracle.OBJECT}, true, yield);
    return output.rows;
});

module.exports =
{
    poll: poll,
    verifyCode: verifyCode,
    getEsn: getEsn,
    shadowAccountCreated: shadowAccountCreated,
    accountIneligible: accountIneligible,
    hasRokuAlready: hasRokuAlready,
    disconnectAccount: disconnectAccount,
    accountDevices: accountDevices
};