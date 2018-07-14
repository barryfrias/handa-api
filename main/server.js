'use strict';

let o_o = require('yield-yield'),
    restify = require('restify'),
    request = require('request'),
    utils = require('./utils.js'),
    mobilityDAO = require('./mobilityDAO.js');

let instance = restify.createServer({ name: 'handa-api' });

instance.acceptable.push('application/json; charset=utf-8');
instance.use(restify.acceptParser(instance.acceptable));
instance.use(restify.bodyParser());
instance.use(restify.queryParser({ mapParams: true }));
instance.use(restify.CORS());

const tokenHeader = 'x-handa-auth-token';

let whiteListed =
[
     /^\/handa\/api\/site\/.*/,
     /^\/handa\/api\/users\/app\/versions\/.*/,
     /^\/handa\/api\/auth\/.*/,
     /^\/handa\/api\/users\/ldap\/search/,
     /^\/handa\/api\/users\/registration*/,
     /^\/handa\/api\/users\/verify/,
     /^\/handa\/api\/users\/companies/,
     /^\/handa\/jobs\/.*/
];

function isWhiteListed(url)
{
    for(let regex of whiteListed)
    {
        if(url.match(regex))
        {
            return true;
        }
    }
    return false;
}

//MIDDLEWARE THAT CHECKS FOR TOKEN'S VALIDITY THRU DATABASE
instance.pre(o_o(function *(req, res, next)
{
    if(isWhiteListed(req.url))
    {
        return next();
    }

    if (!req.headers[tokenHeader])
    {
        return res.send(403, utils.outputJson('BadAuthorization', 'Missing authorization token'));
    }

    try
    {
        let response = yield mobilityDAO.checkToken(req.headers[tokenHeader], yield);
        if(response == 404)
        {
            return res.send(401, utils.outputJson('BadAuthorization', 'Authorization is not valid'));
        }
        else if(response != 200)
        {
            return res.send(500, utils.outputJson('ServerError', 'Unable to validate authorization token'));
        }
    }
    catch(err)
    {
        logger.error(err);
        return res.send(500, utils.outputJson('ServerError', 'Unexpected error'));
    }
    return next();
}));

let shutdown = o_o(function *()
{
    yield instance.close(yield);
    process.exit(0);
});

// shutdown hooks
process.on('uncaughtException', err => { logger.info(err); shutdown(); });
process.on('SIGTERM', () => { logger.info({time: new Date().toString()}, 'Received SIGTERM'); shutdown(); });
process.on('SIGINT', () => { logger.info({time: new Date().toString()}, 'Received SIGINT'); shutdown(); });

module.exports =
{
   instance: instance
}