'use strict';

let o_o = require('yield-yield'),
    request = require('request'),
    instance = require('./server.js').instance,
    mobilityDAO = require('./mobilityDAO.js');

let httpTimeout = conf['http.timeout'];

function getHandaOpts(req, url)
{
    let options = 
    {
        headers: req.headers,
        url: url,
        timeout: httpTimeout,
        body: req.body,
        json: true
    };
    return options;
}

instance.post('/handa/api/auth/authorize', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        let response = yield request.post(getHandaOpts(req, conf['handaUrl'] + '/users/verify'), yield);

        if(response[0].statusCode == 200)
        {
            if('ldap' === response[1].authMethod)
            {
                let nonce = yield mobilityDAO.getNonce(req.body.mobileNumber, yield);
                response[1].nonce = nonce;
            }
            res.send(response[1]);
        }
        else
        {
            res.send(response[0].statusCode, { message: response[1] });
        }
    }
    catch(err)
    {
        logger.error(err);
        return res.send(err);
    }
    return next();
}));

instance.post('/handa/api/auth/authenticate', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        let response = yield request.post(getHandaOpts(req, conf['handaUrl'] + '/users/authenticate'), yield);

        if(response[0].statusCode == 200)
        {
            let tokenFromDb = yield mobilityDAO.getToken(req.body.mobileNumber, req.body.playerID || null, yield);
            let json =
            {
                token: tokenFromDb
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

instance.post('/handa/api/auth/authenticate2', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        let response = yield request.post(getHandaOpts(req, conf['handaUrl'] + '/users/authenticate2'), yield);

        if(response[0].statusCode == 200)
        {
            let tokenFromDb = yield mobilityDAO.getToken(req.body.mobileNumber, req.body.playerID || null, yield);
            let json =
            {
                token: tokenFromDb
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

instance.post('/handa/api/auth/authenticate3', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        let response = yield request.post(getHandaOpts(req, conf['handaUrl'] + '/users/authenticate3'), yield);

        if(response[0].statusCode == 200)
        {
            let tokenFromDb = yield mobilityDAO.getToken(req.body.mobileNumber, req.body.playerID || null, yield);
            let json =
            {
                token: tokenFromDb
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

instance.post('/handa/api/auth/authenticate4', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        let response = yield request.post(getHandaOpts(req, conf['handaUrl'] + '/users/authenticate4'), yield);

        if(response[0].statusCode == 200)
        {
            let tokenFromDb = yield mobilityDAO.getToken(req.body.mobileNumber, req.body.playerID || null, yield);
            let json = response[1];
            json.token = tokenFromDb;
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

instance.post('/handa/api/auth/logout', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});
    try
    {
        mobilityDAO.deleteToken(req.body.token);
        res.send(200, { message: 'Ok' });
        return next();
    }
    catch(err)
    {
        logger.error(err);
        return res.send(err);
    }
    return next();
}));

instance.post('/handa/api/auth/adfs/callback', o_o(function *(req, res, next)
{
    logger.info({time: new Date().toString(), req:req});

    if(!req.body)
    {
        res.send(400, { message: "Request json body should not be empty" });
        return next();
    }

    if(!req.body.mobileNumber)
    {
        res.send(400, { message: "mobileNumber should not be empty or null" });
        return next();
    }
    if(!req.body.username)
    {
        res.send(400, { message: "username should not be empty or null" });
        return next();
    }
    if(!req.body.nonce)
    {
        res.send(400, { message: "nonce should not be empty or null" });
        return next();
    }
    if(!req.body.playerID)
    {
        res.send(400, { message: "playerID should not be empty or null" });
        return next();
    }

    try
    {
        let result = yield mobilityDAO.loginByNonce(req.body.mobileNumber, req.body.username, req.body.nonce, yield);
        if('OK' !== result)
        {
            res.send(401, { message: result });
            return next();
        }

        let tokenFromDb = yield mobilityDAO.getToken(req.body.mobileNumber, req.body.playerID, yield);
        let json =
        {
            token: tokenFromDb
        }
        res.send(json);
        return next();
    }
    catch(err)
    {
        logger.error(err);
        return res.send(err);
    }
    return next();
}));