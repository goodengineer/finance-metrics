const moment = require('moment')

const args = process.argv.slice(2);

if (args.length !== 3) {
  throw Error('script requires exactly 3 paramenters: fondo, clase & desde')
}

const fondo = args[0]
const clase = args[1]
const desde = args[2]

if (isNaN(fondo)) {
  throw Error(`fondo must be a number`)
}

if (isNaN(clase)) {
  throw Error(`clase must be a number`)
}

if (!moment(desde, 'YYYY-MM-DD', true).isValid()) {
  throw Error(`invalid date does not comply with format YYYY-MM-DD: ${desde}`)
}

console.log({ fondo, clase, desde });

/*
TODO: add environment variable with path to private key for firebase (in home directory)
then configure admin at this script
*/
