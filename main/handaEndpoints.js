'use strict';

let o_o = require('yield-yield'),
    restify = require('restify'),
    request = require('request'),
    URL = require('url'),
    utils = require('./utils.js'),
    instance = require('./server.js').instance;

let httpTimeout = conf['http.timeout'];

function getOptionsForHomeRewards(req)
{
    return {
        headers:
        {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        url: conf['homerewardsUrl'] + '/' + req.params[0] + getQueryPart(req.url),
        timeout: httpTimeout,
        json: true,
        body: req.body
    }
}

function getQueryPart(url)
{
    let parsedURL = URL.parse(url);
    return (parsedURL && parsedURL.search ? parsedURL.search : '');
}

//HOMEREWARDS ROUTES
let homerewards = /^\/homerewards\/api\/(.*)/;

instance.post(homerewards, o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        yield request.post(getOptionsForHomeRewards(req)).pipe(res);
    }
    catch(err)
    {
        utils.logError(err);
        return res.send(err);
    }
    return next();
}));

instance.get(homerewards, o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        yield request.get(getOptionsForHomeRewards(req)).pipe(res);
    }
    catch(err)
    {
        utils.logError(err);
        return res.send(err);
    }
    return next();
}));