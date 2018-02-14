// see https://jsao.io/2015/03/making-a-wrapper-module-for-the-node-js-driver-for-oracle-database/
'use strict';

let o_o = require('yield-yield'),
    oracle = require('oracledb'); // installed globally

let pool;

let createPool = o_o(function *(options)
{
    let poolDetails =
    {
        user: options.user,
        password: options.password,
        connectString: options.connectString,
        poolMax: 10,
        poolMin: 2,
        poolIncrement: 2,
        poolTimeout: 300 // 5 minutes
    };

    try
    {
        pool = yield oracle.createPool(poolDetails, yield);
        logger.info({time: new Date().toString(), mobilityDbPool: pool});
    }
    catch(err)
    {
        logger.error(err);
        throw err;
    }
});

function terminatePool()
{
    return new Promise((resolve, reject) =>
    {
        if(pool)
        {
            pool.terminate(function(err)
            {
                logger.info({time: new Date().toString()}, 'mobility connection pool terminated');
                if(err)
                {
                    return reject(err);
                }
                resolve();
            });
        }
        else
        {
            resolve();
        }
    });
}

function getConnection()
{
    return new Promise((resolve, reject) =>
    {
        pool.getConnection((err, connection) =>
        {
            if (err)
            {
                return reject(err);
            }
            resolve(connection);
        });
    });
}

function releaseConnection(connection)
{
    connection.release(err =>
    {
        if(err)
        {
            logger.error(err);
        }
    });
}

let executeProc = o_o(function *(sql, binds, options, withCursor)
{
    let connection = yield getConnection();
    let results = yield connection.execute(sql, binds, options, yield);
    if(withCursor)
    {
        let rows = yield getRows(connection, results.outBinds.p_cursor, yield);
        delete results.outBinds.p_cursor;
        return { outBinds: results.outBinds, rows: rows };
    }
    process.nextTick(() => releaseConnection(connection));
    return results.outBinds;
});

let executeProcNoResult = o_o(function *(sql, binds)
{
    let connection = yield getConnection();
    yield connection.execute(sql, binds, yield);
    process.nextTick(() => releaseConnection(connection));
});

let getRows = o_o(function *(connection, resultSet)
{
    let numRows = 1000,
        arr = [];
    try
    {
        let rows = yield resultSet.getRows(numRows, yield);
        while(rows.length > 0)
        {
            Array.prototype.push.apply(arr, rows);
            rows = yield resultSet.getRows(numRows, yield);
        }
        return arr;
    }
    catch(err)
    {
        throw err;
    }
    finally
    {
        doClose(connection, resultSet);
    }
});

function doClose(connection, resultSet)
{
  resultSet.close(err =>
  {
      if(err) { logger.error(err); }
      releaseConnection(connection);
  });
}

module.exports =
{
    oracle: oracle,
    createPool: createPool,
    terminatePool: terminatePool,
    executeProc: executeProc,
    executeProcNoResult: executeProcNoResult,
    getRows: getRows
};