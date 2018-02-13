'use strict';

let o_o = require('yield-yield'),
    restify = require('restify'),
    request = require('request'),
    utils = require('./utils.js');

let instance = restify.createServer({ name: 'handa-api' });

instance.acceptable.push('application/json; charset=utf-8');
instance.use(restify.acceptParser(instance.acceptable));
instance.use(restify.bodyParser());
instance.use(restify.queryParser({ mapParams: true }));
instance.use(restify.CORS());

const tokenHeader = 'x-pldt-auth-token';

//MIDDLEWARE THAT CHECKS FOR TOKEN'S VALIDITY THRU CORE TOKENS API
instance.pre(o_o(function *(req, res, next)
{
    if (!req.headers[tokenHeader])
    {
        return res.send(403, utils.outputJson('BadAuthorization', 'Missing authorization token'));
    }

    try
    {
        let options =
        {
            headers:
            {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            url: conf['tokens.url'],
            timeout: conf['request.timeout'],
            json: true,
            body:
            {
                'appCode': 'wrapper',
                'token': req.headers[tokenHeader]
            }
        };

        let response = yield request.post(options, yield);
        let statusCode = response[0].statusCode;
        if(statusCode == 401)
        {
            return res.send(401, utils.outputJson('BadAuthorization', 'Authorization is not valid'));
        }
        else if(statusCode != 200)
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