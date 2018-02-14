'use strict';

let o_o = require('yield-yield'),
    conf = require('./properties.js'),
    logger = require('./logger.js').log,
    database = require('./database.js');

global.logger = logger;

//BEGIN INIT AND START SERVER
o_o.run(function *()
{
    conf = yield conf.load(yield);
    database.createPool({user: conf['db.user'],password: conf['db.password'],connectString: conf['db.connectionString']}, yield o_o.QRUN);
    yield o_o.QCOLLECT;

    global.conf = conf; // set as global object

    let server = require('./server.js').instance;
    server.listen(conf['port'], '0.0.0.0', () =>
    {
        require('./handaAuthEndpoints.js'); logger.info({time: new Date().toString()}, 'Loaded handa auth api endpoints');
        require('./handaEndpoints.js'); logger.info({time: new Date().toString()}, 'Loaded handa api endpoints');
        logger.info({time: new Date().toString()}, `${server.name} listening at ${server.url}`);
    });
});