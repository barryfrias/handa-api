'use strict';

let o_o = require('yield-yield'),
    restify = require('restify'),
    request = require('request'),
    URL = require('url'),
    utils = require('./utils.js'),
    instance = require('./server.js').instance;

let httpTimeout = conf['http.timeout'];

instance.post('/handa/api/auth/authenticate', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        let options =
        {
            headers:
            {
                "Content-Type": 'application/json'
            },
            url: conf['handaUrl'] + '/users/authenticate',
            timeout: httpTimeout,
            body: req.body,
            json: true
        };

        let response = yield request.post(options, yield);

        if(response[0].statusCode == 200)
        {
            let json =
            {
                token: 'TOKEN HERE'
            }
            res.send(json);
            return next();
        }

        res.send(response[0].statusCode, response[1]);
        return next();
    }
    catch(err)
    {
        logger.error(err);
        return res.send(err);
    }
    return next();
}));