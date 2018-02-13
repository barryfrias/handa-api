'use strict';

let o_o = require('yield-yield'),
    conf = require('./properties.js'),
    logger = require('./logger.js').log;

global.logger = logger;

//BEGIN INIT AND START SERVER
o_o.run(function *()
{
    conf = yield conf.load(yield);
    global.conf = conf; // set as global object

    let server = require('./server.js').instance;
    server.listen(conf['port'], '0.0.0.0', () =>
    {
        require('./handaEndpoints.js'); logger.info({time: new Date().toString()}, 'Loaded handa rewards endpoints');
        logger.info({time: new Date().toString()}, `${server.name} listening at ${server.url}`);
    });
});