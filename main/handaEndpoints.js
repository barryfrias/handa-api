'use strict';

let o_o = require('yield-yield'),
    restify = require('restify'),
    request = require('request'),
    URL = require('url'),
    utils = require('./utils.js'),
    instance = require('./server.js').instance;

let httpTimeout = conf['http.timeout'];

function getOptionsForHanda(req)
{
    return {
        headers:
        {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        url: conf['handaUrl'] + '/' + req.params[0] + getQueryPart(req.url),
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

let handaApi = /^\/handa\/api\/(.*)/;

instance.get(handaApi, o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        yield request.get(getOptionsForHanda(req)).pipe(res);
    }
    catch(err)
    {
        utils.logError(err);
        return res.send(err);
    }
    return next();
}));

instance.post(handaApi, o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        yield request.post(getOptionsForHanda(req)).pipe(res);
    }
    catch(err)
    {
        utils.logError(err);
        return res.send(err);
    }
    return next();
}));

instance.put(handaApi, o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        yield request.put(getOptionsForHanda(req)).pipe(res);
    }
    catch(err)
    {
        utils.logError(err);
        return res.send(err);
    }
    return next();
}));

instance.del(handaApi, o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        yield request.del(getOptionsForHanda(req)).pipe(res);
    }
    catch(err)
    {
        utils.logError(err);
        return res.send(err);
    }
    return next();
}));