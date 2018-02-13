'use strict';

function endPoint(url)
{
    return conf['root.url'] + url;
}

function logError(err)
{
    logger.info({time: new Date().toString()}, 'Unexpected error encountered...');
    logger.info(err);
}

function logReqRes(req, res)
{
    logger.info({time: new Date().toString(), req: req, res: res});
}

function logTimedReqRes(req, res, time)
{
    logger.info({time: new Date().toString(), req: req, res: res, elapsedTime: elapsedTime(time)});
}

function outputJson(status, errorCode, desc)
{
    return {
        'Status': status || 'Success',
        'ErrorCode': errorCode,
        'Description': desc
    }
}

function badRequest(msg)
{
    return outputJson('Failure', 'BadRequest', msg);
}

function serviceUnavailable()
{
    return outputJson('Failure', 'ServiceUnavailable', 'Cannot process the request, try again later');
}

function elapsedTime(startTime)
{
    const elapsedTime = process.hrtime(startTime);
    return (((elapsedTime[0] * 1e9 + elapsedTime[1]) / 1000000) / 1000).toFixed(3) + ' sec(s)'
}

function padAccountNumber(str)
{
    var s = "000000000" + str;
    return s.substr(s.length-10);
}

module.exports =
{
    logError: logError,
    logReqRes: logReqRes,
    logTimedReqRes: logTimedReqRes,
    outputJson: outputJson,
    badRequest: badRequest,
    serviceUnavailable: serviceUnavailable,
    endPoint: endPoint,
    padAccountNumber: padAccountNumber
}