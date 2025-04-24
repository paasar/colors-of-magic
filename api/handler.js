'use strict';

function comparable(colorsString) {
  return colorsString.split('').sort().join('').toUpperCase();
}

function toAcronyms(str) {
  return str.replace(/mtg-white/g, 'W')
            .replace(/mtg-blue/g, 'U')
            .replace(/mtg-black/g, 'B')
            .replace(/mtg-red/g, 'R')
            .replace(/mtg-green/g, 'G')
            .replace(/[^WUBRG]/ig, '');
}

const colorsToName = {
  'GW': ':mtg-white::mtg-green: Selesnya',
  'BW': ':mtg-white::mtg-black: Orzhov',
  'RW': ':mtg-white::mtg-red: Boros',
  'UW': ':mtg-white::mtg-blue: Azorius',
  'BU': ':mtg-blue::mtg-black: Dimir',
  'BR': ':mtg-black::mtg-red: Rakdos',
  'BG': ':mtg-black::mtg-green: Golgari',
  'RU': ':mtg-blue::mtg-red: Izzet',
  'GU': ':mtg-blue::mtg-green: Simic',
  'GR': ':mtg-red::mtg-green: Gruul',
  'GRW': ':mtg-white::mtg-red::mtg-green: Naya',
  'BUW': ':mtg-white::mtg-blue::mtg-black: Esper',
  'BRU': ':mtg-blue::mtg-black::mtg-red: Grixis',
  'BGR': ':mtg-black::mtg-red::mtg-green: Jund',
  'GUW': ':mtg-white::mtg-blue::mtg-green: Bant',
  'BGW': ':mtg-white::mtg-black::mtg-green: Abzan (Necra)',
  'GRU': ':mtg-blue::mtg-red::mtg-green: Temur (Ceta)',
  'RUW': ':mtg-white::mtg-blue::mtg-red: Jeskai (Raka)',
  'BRW': ':mtg-white::mtg-black::mtg-red: Mardu (Dega)',
  'BGU': ':mtg-blue::mtg-black::mtg-green: Sultai (Ana)',
  'BGRU': ':mtg-blue::mtg-black::mtg-red::mtg-green: Glint',
  'BGRW': ':mtg-white::mtg-black::mtg-red::mtg-green: Dune',
  'GRUW': ':mtg-white::mtg-blue::mtg-red::mtg-green: Ink',
  'BGUW': ':mtg-white::mtg-blue::mtg-black::mtg-green: Witch',
  'BRUW': ':mtg-white::mtg-blue::mtg-black::mtg-red: Yore',
  'BGRUW': ':mtg-white::mtg-blue::mtg-black::mtg-red::mtg-green: Five Color'
};

const nameToColors = {
  'selesnya': ':mtg-white::mtg-green: Selesnya',
  'orzhov': ':mtg-white::mtg-black: Orzhov',
  'boros': ':mtg-white::mtg-red: Boros',
  'azorius': ':mtg-white::mtg-blue: Azorius',
  'dimir': ':mtg-blue::mtg-black: Dimir',
  'rakdos': ':mtg-black::mtg-red: Rakdos',
  'golgari': ':mtg-black::mtg-green: Golgari',
  'izzet': ':mtg-blue::mtg-red: Izzet',
  'simic': ':mtg-blue::mtg-green: Simic',
  'gruul': ':mtg-red::mtg-green: Gruul',
  'naya': ':mtg-white::mtg-red::mtg-green: Naya',
  'esper': ':mtg-white::mtg-blue::mtg-black: Esper',
  'grixis': ':mtg-blue::mtg-black::mtg-red: Grixis',
  'jund': ':mtg-black::mtg-red::mtg-green: Jund',
  'bant': ':mtg-white::mtg-blue::mtg-green: Bant',
  'abzan': ':mtg-white::mtg-black::mtg-green: Abzan (Necra)',
  'temur': ':mtg-blue::mtg-red::mtg-green: Temur (Ceta)',
  'jeskai': ':mtg-white::mtg-blue::mtg-red: Jeskai (Raka)',
  'mardu': ':mtg-white::mtg-black::mtg-red: Mardu (Dega)',
  'sultai': ':mtg-blue::mtg-black::mtg-green: Sultai (Ana)',
  'necra': ':mtg-white::mtg-black::mtg-green: Abzan (Necra)',
  'ceta': ':mtg-blue::mtg-red::mtg-green: Temur (Ceta)',
  'raka': ':mtg-white::mtg-blue::mtg-red: Jeskai (Raka)',
  'dega': ':mtg-white::mtg-black::mtg-red: Mardu (Dega)',
  'ana': ':mtg-blue::mtg-black::mtg-green: Sultai (Ana)',
  'glint': ':mtg-blue::mtg-black::mtg-red::mtg-green: Glint',
  'dune': ':mtg-white::mtg-black::mtg-red::mtg-green: Dune',
  'ink': ':mtg-white::mtg-blue::mtg-red::mtg-green: Ink',
  'witch': ':mtg-white::mtg-blue::mtg-black::mtg-green: Witch',
  'yore': ':mtg-white::mtg-blue::mtg-black::mtg-red: Yore',
  'five color': ':mtg-white::mtg-blue::mtg-black::mtg-red::mtg-green: Five Color'
};

function getNameOrColors(possibleColors, possibleName) {
  const nameAnswer = colorsToName[comparable(possibleColors)];
  const colorsAnswer = nameToColors[possibleName.trim().toLowerCase()];
  if (colorsAnswer) {
    return colorsAnswer;
  } else if (nameAnswer) {
    return nameAnswer;
  } else {
    return 'Unknown';
  }
}

function createResponse(msg) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: msg,
      response_type: 'in_channel',
    }),
  };
}

function createNotFoundResponse() {
 return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: ':mtg-black: Could not find anything with that. :mtg-black:',
    }),
  };
}


function failResponse(callback, msg) {
  const response = {
    statusCode: 400,
    body: JSON.stringify({
      message: msg,
    }),
  };
  callback(msg, response);
}

function eqSet(as, bs) {
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
}

module.exports.colors = (event, context, callback) => {
  const inputParams = {};
  decodeURI(event.body).split('&').forEach(function(entry) {
    const keyAndValue = entry.split('=');
    inputParams[keyAndValue[0]] = keyAndValue[1];
  });

  console.log('token:', inputParams.token);
  console.log('text:', inputParams.text);

  if (inputParams.token === 'ACCESS_TOKEN') {
    console.log('token ok');
    const result = getNameOrColors(toAcronyms(decodeURIComponent(inputParams.text)), inputParams.text);
    if (result != 'Unknown') {
      callback(null, createResponse(result));
    } else {
      callback(null, createNotFoundResponse(callback));
    }
  } else {
    failResponse(callback, 'Unknown token. Request rejected.');
  }
};
