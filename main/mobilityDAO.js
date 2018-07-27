'use strict';

let o_o = require('yield-yield'),
    database = require('./database.js');

const GET_TOKEN='begin get_token(:mobile_num, :player_id, :token); end;';

let getToken = o_o(function *(mobile_num, player_id)
{
    let bindvars =
    {
         mobile_num: mobile_num,
         player_id: player_id,
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

const GET_PENDING_OUTBOUND_NOTIF='begin handa_notif.get_pending_outbound_notif(:p_cursor); end;';

let getPendingNotif = o_o(function *()
{
    let bindvars =
    {
         p_cursor: { type: database.oracle.CURSOR, dir: database.oracle.BIND_OUT }
    };
    let result = yield database.executeProc(GET_PENDING_OUTBOUND_NOTIF, bindvars, { outFormat: database.oracle.OBJECT }, true, yield);
    return result.rows;
});

const UPDATE_NOTIF='begin handa_notif.update_notif(:p_playerIds, :p_wsResponse, :p_count); end;';

let updateNotifications = o_o(function *(playerIds, wsResponse)
{
    if(!playerIds || playerIds.length == 0)
    {
        playerIds = [''];
    }
    let bindvars =
    {
         p_playerIds: { type: database.oracle.STRING, dir: database.oracle.BIND_IN, maxSize: 128, val: playerIds },
         p_wsResponse: wsResponse,
         p_count: { type: database.oracle.NUMBER, dir: database.oracle.BIND_OUT }
    };

    let result = yield database.executeProc(UPDATE_NOTIF, bindvars, {}, false, yield);
    return result.p_count;
});

module.exports =
{
    getToken: getToken,
    checkToken: checkToken,
    deleteToken: deleteToken,
    getPendingNotif: getPendingNotif,
    updateNotifications: updateNotifications
};