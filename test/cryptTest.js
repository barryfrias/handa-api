'use strict';

let o_o = require('yield-yield');

o_o.run(function *()
{
    let crypt = require('../main/crypt.js');

    console.log('--------------encode--------------');
    let val = yield crypt.encode('n3w2rb0r', yield);
    console.log(val);

    console.log('\n--------------decode--------------');
    let decoded = yield crypt.decode(val, yield);
    console.log(decoded);
});