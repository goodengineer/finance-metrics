const moment = require('moment')
const { injectFondoForDates } = require('./fondos')

const args = process.argv.slice(2)

if (args.length !== 3) {
  throw Error('script requires exactly 3 paramenters: fondo, clase & desde')
}

const admin = require('firebase-admin')
require('./local-firebase-admin').initialize(admin)
const db = admin.firestore()

const fondo = args[0]
const clase = args[1]
const desdeString = args[2]

if (isNaN(fondo)) {
  throw Error(`fondo must be a number`)
}

if (isNaN(clase)) {
  throw Error(`clase must be a number`)
}

if (!moment(desdeString, 'YYYY-MM-DD', true).isValid()) {
  throw Error(`invalid date does not comply with format YYYY-MM-DD: ${desdeString}`)
}
const desde = moment(desdeString, 'YYYY-MM-DD')
const today = moment().startOf('day')

if (today < desde) {
  console.log('nothing to inject, exiting');
  process.exit(0)
}

const dates = []
let i = 0
while(desde.clone().add(i, 'days') < today) {
  dates.push(desde.clone().add(i, 'days').format('YYYY-MM-DD'))
  i++
}

injectFondoForDates(db, fondo, clase, dates)
.then(() => {
  console.log(`finished injecting history for fondo ${fondo}-${clase} since ${desdeString}`);
})
