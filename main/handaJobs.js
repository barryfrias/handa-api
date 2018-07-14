'use strict';

let o_o = require('yield-yield'),
    request = require('request'),
    mobilityDAO = require('./mobilityDAO.js'),
    instance = require('./server.js').instance;

let httpTimeout = conf['http.timeout'];

function getRequestOptions(req)
{
    return {
        headers:
        {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        url: conf['oneSignalUrl'],
        timeout: httpTimeout,
        json: true,
        body: req.body
    }
}

instance.post('/handa/jobs/notification/processor', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        res.send(200, { message: 'Ok' });
        next();
        let fromDb = yield mobilityDAO.getPendingNotif(yield);
        let map = process(fromDb);
        console.log(map); //TODO: DELETE ME
    }
    catch(err)
    {
        logger.error(err);
        return res.send(err);
    }
    return next();
}));

function process(fromDb)
{
    let map = new Map();
    //group notifications by newsfeed id
    for(let e of fromDb)
    {
        let val = map.get(e.NEWSFEED_ID);
        if(val)
        {
            val.playerIds.push(e.PLAYER_ID);
        }
        else
        {
            val =
            {
                playerIds: [e.PLAYER_ID],
                newsFeedId: e.NEWSFEED_ID,
                message: e.MESSAGE
            }
            map.set(e.NEWSFEED_ID, val);
        }
    }

    for(let val of map.values())
    {
        let arr;
        val.playerIdsArrayofArrays = [];
        while((arr = val.playerIds.splice(0, conf['playerIdsFixedLength'])).length != 0)
        {
            val.playerIdsArrayofArrays.push(arr);
        }
        delete val.playerIds;
        console.log(val); //TODO: DELETE ME
    }
    return map;
}