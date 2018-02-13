'use strict';

let o_o = require('yield-yield'),
    properties = require ("properties"),
    crypt = require('./crypt.js');

const encRegex = /^enc\((.*)\)$/g;

let decryptValue = o_o(function*(name)
{
    let result = encRegex.exec(name);
    if(result)
    {
        result = yield crypt.decode(result[1], yield);
        return result;
    }
    return name;
});

let load = o_o(function* ()
{
    let options =
    {
        path: true,
        namespaces: false,
        sections: true,
        variables: true,
        include: true
    };
    let props = yield properties.parse(__dirname + '/../conf/config.properties', options, yield);
    for(let prop in props)
    {
        if(typeof(props[prop]) === 'string' && props[prop].match(encRegex))
        {
            props[prop] = yield decryptValue(props[prop], yield);
        }
    }
    return props;
});

module.exports =
{
    load: load
}