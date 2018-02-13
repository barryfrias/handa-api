'use strict';

let bunyan = require('bunyan');

let logStream =
{
    level: 'info',
    stream: process.stdout
}

if(process.env.log_env && process.env.log_env === 'prod')
{
    logStream =
    {
        type: 'rotating-file',
        path: __dirname + '/../logs/server.log',
        level: "info",
        period: '1d',   // daily rotation
        count: 30        // keep back copies
    }
}

let log = bunyan.createLogger
({
    name: 'logger',
    serializers:
    {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res
    },
    streams: [logStream]
});

module.exports =
{
    log: log
}