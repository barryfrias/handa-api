'use strict';

let o_o = require('yield-yield'),
    request = require('request'),
    mobilityDAO = require('./mobilityDAO.js'),
    instance = require('./server.js').instance;

let httpTimeout = conf['http.timeout'];

function getRequestOptions(json)
{
    return {
        headers:
        {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            authorization: 'Basic ODVkYWFjODYtODU5OS00OTQwLWI5MTQtNTk0MTVhZTIwNThj'
        },
        url: conf['oneSignalUrl'],
        proxy: conf['proxyUrl'],
        strictSSL: false,
        tunnel: true,
        followAllRedirects: true,
        timeout: httpTimeout,
        json: true,
        body: json
    }
}

//This endpoint is typically called via curl that is run thru cron
instance.post('/handa/jobs/notification/processor', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        let json =
        {
                app_id: 'dff70da9-fa80-4ca5-9480-d92cf9c36dc4',
                include_player_ids: [],
                data: {
                    id: null,
                    title: null,
                    message: null,
                    type: null
                },
                headings: {
                    en: null // title
                },
                contents: {
                    en: null // message
                },
                small_icon: 'push_notif_large',
                large_icon: 'push_notif_large',
                mutable_content: true,
                ios_badgeType: 'Increase',
                ios_badgeCount: 1
        };
        let fromDb = yield mobilityDAO.getPendingNotif(yield);
        let map = process(fromDb);
        for(let val of map.values())
        {
            json.data.id = val.NEWSFEED_ID;
            json.data.title = val.TITLE;
            json.data.message = val.MESSAGE;
            json.data.type = val.TYPE;
            json.headings.en = val.TITLE;
            json.contents.en = val.MESSAGE;
            for(let playerIds of val.playerIdsArrayofArrays)
            {
                json.include_player_ids = playerIds;
                let response = yield request.post(getRequestOptions(json), yield);
                let updateCount = yield mobilityDAO.updateNotifications(playerIds, JSON.stringify(response[1]), yield);
            }
        }
        map.clear();
        res.send(200, { message: 'Ok' });
    }
    catch(err)
    {
        logger.error(err);
        res.send(err);
    }
    return next();
}));

function process(fromDb)
{
    let map = new Map();
    //group notifications by newsfeed id
    let e;
    while((e = fromDb.pop()))
    {
        let val = map.get(e.NEWSFEED_ID);
        if(val)
        {
            val.playerIds.push(e.PLAYER_ID);
        }
        else
        {
            e.playerIds = [e.PLAYER_ID];
            map.set(e.NEWSFEED_ID, e);
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
    }
    return map;
}