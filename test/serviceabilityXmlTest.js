'use strict';

let o_o = require('yield-yield'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    util = require('util');

let xmlParser = new xml2js.Parser(
{
    normalize: true,
    normalizeTags: false,
    explicitArray: false
});

let options = {encoding: 'utf-8'};

let readXml = o_o(function *()
{
    let data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_ADDRESS_CONVERSION.xml', options, yield);
    let Serviceability_ADDRESS_CONVERSION = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_ADDRESS_CONVERSION:');
    console.log(util.inspect(Serviceability_ADDRESS_CONVERSION, false, null));
    console.log('Serviceability_ADDRESS_CONVERSION: ' + JSON.stringify(Serviceability_ADDRESS_CONVERSION));

    data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_ADDRESS_LOV.xml', options, yield);
    let Serviceability_ADDRESS_LOV = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_ADDRESS_LOV:');
    console.log(util.inspect(Serviceability_ADDRESS_LOV, false, null));
    console.log('Serviceability_ADDRESS_LOV: ' + JSON.stringify(Serviceability_ADDRESS_LOV));

    data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_FACILITY_CHECK.xml', options, yield);
    let Serviceability_FACILITY_CHECK = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_FACILITY_CHECK:');
    console.log(util.inspect(Serviceability_FACILITY_CHECK, false, null));
    console.log('Serviceability_FACILITY_CHECK: ' + JSON.stringify(Serviceability_FACILITY_CHECK));

    data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_RESERVE_FACILITY.xml', options, yield);
    let Serviceability_RESERVE_FACILITY = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_RESERVE_FACILITY:');
    console.log(util.inspect(Serviceability_RESERVE_FACILITY, false, null));
    console.log('Serviceability_RESERVE_FACILITY: ' + JSON.stringify(Serviceability_RESERVE_FACILITY));

    data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_CANCEL_RESERVATION.xml', options, yield);
    let Serviceability_CANCEL_RESERVATION = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_CANCEL_RESERVATION:');
    console.log(util.inspect(Serviceability_CANCEL_RESERVATION, false, null));
    console.log('Serviceability_CANCEL_RESERVATION: ' + JSON.stringify(Serviceability_CANCEL_RESERVATION));

    data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_GET_ADDRESS_DETAILS.xml', options, yield);
    let Serviceability_GET_ADDRESS_DETAILS = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_GET_ADDRESS_DETAILS:');
    console.log(util.inspect(Serviceability_GET_ADDRESS_DETAILS, false, null));
    console.log('Serviceability_GET_ADDRESS_DETAILS: ' + JSON.stringify(Serviceability_GET_ADDRESS_DETAILS));

    data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_CANCEL_NUMBER_RESERVATION.xml', options, yield);
    let Serviceability_CANCEL_NUMBER_RESERVATION = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_CANCEL_NUMBER_RESERVATION:');
    console.log(util.inspect(Serviceability_CANCEL_NUMBER_RESERVATION, false, null));
    console.log('Serviceability_CANCEL_NUMBER_RESERVATION: ' + JSON.stringify(Serviceability_CANCEL_NUMBER_RESERVATION));

    data = yield fs.readFile('D:/PROJECTS/PLDT_HOME/Serviceability_FACILITY_CHECK_UPGRADE.xml', options, yield);
    let Serviceability_FACILITY_CHECK_UPGRADE = yield xmlParser.parseString(data, yield);
    console.log('Serviceability_FACILITY_CHECK_UPGRADE:');
    console.log(util.inspect(Serviceability_FACILITY_CHECK_UPGRADE, false, null));
    console.log('Serviceability_FACILITY_CHECK_UPGRADE: ' + JSON.stringify(Serviceability_FACILITY_CHECK_UPGRADE));
});

let Serviceability_ADDRESS_CONVERSION =
{
    'soapenv:Envelope': {
        '$': {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
            'xmlns:tem': 'http://tempuri.org/'
        },
        'soapenv:Header': '',
        'soapenv:Body': {
            'tem:ADDRESS_CONVERSION': {
                'tem:LATITUDE': '14.5844',
                'tem:LONGITUDE': '121.0458',
                'tem:PROVINCE': '?',
                'tem:CITY': '?',
                'tem:BARANGAY': '?',
                'tem:SUBDIVISION': '?',
                'tem:STREET': '?',
                'tem:BUILDING': '?',
                'tem:HOUSE_NO': '?',
                'tem:LOT': '?',
                'tem:BLOCK': '?',
                'tem:UNIT': '?',
                'tem:FLOOR': '?',
                'tem:U_SUBDIVISION': '?',
                'tem:U_STREET': '?',
                'tem:U_BUILDING': '?',
                'tem:CONSUMER': '?',
                'tem:PARAM1': '?',
                'tem:PARAM2': '?',
                'tem:PARAM3': '?',
                'tem:PARAM4': '?',
                'tem:PARAM5': '?',
                'tem:TOKEN': '?'
            }
        }
    }
}

let Serviceability_ADDRESS_LOV =
{
    'soapenv:Envelope': {
        '$': {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
            'xmlns:tem': 'http://tempuri.org/'
        },
        'soapenv:Header': '',
        'soapenv:Body': {
            'tem:ADDRESS_LOV': {
                'tem:WHITELISTED': '?',
                'tem:PROVINCE': '?',
                'tem:CITY': '?',
                'tem:BARANGAY': '?',
                'tem:SUBDIVISION': '?',
                'tem:STREET': '?',
                'tem:BUILDING': '?',
                'tem:CONSUMER': '?',
                'tem:PARAM1': '?',
                'tem:PARAM2': '?',
                'tem:PARAM3': '?',
                'tem:PARAM4': '?',
                'tem:PARAM5': '?',
                'tem:TOKEN': '?'
            }
        }
    }
}

let Serviceability_FACILITY_CHECK =
{
        'soapenv:Envelope': {
            '$': {
                'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
                'xmlns:tem': 'http://tempuri.org/'
            },
            'soapenv:Header': '',
            'soapenv:Body': {
                'tem:FACILITY_CHECK': {
                    'tem:WHITELISTED': '?',
                    'tem:LATITUDE': '?',
                    'tem:LONGITUDE': '?',
                    'tem:PROVINCE': '?',
                    'tem:CITY': '?',
                    'tem:BARANGAY': '?',
                    'tem:STREET': '?',
                    'tem:STREETTYPE': '?',
                    'tem:SUBDIVISION': '?',
                    'tem:BUILDING': '?',
                    'tem:LOT': '?',
                    'tem:BLOCK': '?',
                    'tem:HOUSE_NUMBER': '?',
                    'tem:UNIT': '?',
                    'tem:FLOOR': '?',
                    'tem:NE_TECHNOLOGY': '?',
                    'tem:CONSUMER': '?',
                    'tem:PARAM1': '?',
                    'tem:PARAM2': '?',
                    'tem:PARAM3': '?',
                    'tem:PARAM4': '?',
                    'tem:PARAM5': '?',
                    'tem:TOKEN': '?'
                }
            }
        }
}

let Serviceability_RESERVE_FACILITY =
{
    'soapenv:Envelope': {
        '$': {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
            'xmlns:tem': 'http://tempuri.org/'
        },
        'soapenv:Header': '',
        'soapenv:Body': {
            'tem:RESERVE_FACILITY': {
                'tem:WHITELISTED': '?',
                'tem:LATITUDE': '?',
                'tem:LONGITUDE': '?',
                'tem:EXCHANGECODE': '?',
                'tem:PROVINCE': '?',
                'tem:CITY': '?',
                'tem:BARANGAY': '?',
                'tem:STREET': '?',
                'tem:STREETTYPE': '?',
                'tem:SUBDIVISION': '?',
                'tem:BUILDING': '?',
                'tem:LOT': '?',
                'tem:BLOCK': '?',
                'tem:HOUSE_NUMBER': '?',
                'tem:UNIT': '?',
                'tem:FLOOR': '?',
                'tem:RESERVATIONID_V': '?',
                'tem:RESERVATIONID_D': '?',
                'tem:RESERVATIONID_IP1': '?',
                'tem:RESERVATIONID_IP2': '?',
                'tem:RESERVATIONID_IP3': '?',
                'tem:PSTN_SERVICE_ID': '?',
                'tem:TERMINALS': '?',
                'tem:CID': '?',
                'tem:PARAM1': '?',
                'tem:PARAM2': '?',
                'tem:PARAM3': '?',
                'tem:PARAM4': '?',
                'tem:PARAM5': '?',
                'tem:CONSUMER': '?',
                'tem:TOKEN': '?'
            }
        }
    }
}

let Serviceability_CANCEL_RESERVATION =
{
    'soapenv:Envelope': {
        '$': {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
            'xmlns:tem': 'http://tempuri.org/'
        },
        'soapenv:Header': '',
        'soapenv:Body': {
            'tem:CANCEL_RESERVATION': {
                'tem:RESERVATIONID_V': '?',
                'tem:RESERVATION_D': '?',
                'tem:RESERVATION_IP1': '?',
                'tem:RESERVATION_IP2': '?',
                'tem:RESERVATION_IP3': '?',
                'tem:CONSUMER': '?',
                'tem:TOKEN': '?'
            }
        }
    }
}

let Serviceability_GET_ADDRESS_DETAILS =
{
    Envelope: {
        '$': {
            xmlns: 'http://schemas.xmlsoap.org/soap/envelope/'
        },
        Body: {
            GET_ADDRESS_DETAILS: {
                '$': {
                    xmlns: 'http://tempuri.org/'
                },
                REFERENCENUMBER: '[string?]',
                IDENTIFIER: '[string?]',
                PARAM1: '[string?]',
                PARAM2: '[string?]',
                PARAM3: '[string?]',
                PARAM4: '[string?]',
                PARAM5: '[string?]',
                CONSUMER: '[string?]',
                TOKEN: '[string?]'
            }
        }
    }
}

let Serviceability_CANCEL_NUMBER_RESERVATION =
{
    'soapenv:Envelope': {
        '$': {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
            'xmlns:tem': 'http://tempuri.org/'
        },
        'soapenv:Header': '',
        'soapenv:Body': {
            'tem:CANCEL_NUMBER_RESERVATION': {
                'tem:RESERVATIONID_V': '?',
                'tem:PARAM1': '?',
                'tem:PARAM2': '?',
                'tem:PARAM3': '?',
                'tem:PARAM4': '?',
                'tem:PARAM5': '?',
                'tem:CONSUMER': '?',
                'tem:TOKEN': '?'
            }
        }
    }
}

let Serviceability_FACILITY_CHECK_UPGRADE =
{
    'soapenv:Envelope': {
        '$': {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
            'xmlns:tem': 'http://tempuri.org/'
        },
        'soapenv:Header': '',
        'soapenv:Body': {
            'tem:FACILITY_CHECK_UPGRADE': {
                'tem:REFERENCENUMBER': '[string?]',
                'tem:IDENTIFIER': '[string?]',
                'tem:NETECHNOLOGY': '[string?]',
                'tem:HIGHERPACKAGEFLAG': '[string?]',
                'tem:PARAM1': '[string?]',
                'tem:PARAM2': '[string?]',
                'tem:PARAM3': '[string?]',
                'tem:PARAM4': '[string?]',
                'tem:PARAM5': '[string?]',
                'tem:CONSUMER': '[string?]',
                'tem:TOKEN': '[string?]'
            }
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
readXml();