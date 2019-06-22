const moment = require('moment')
const { injectCurrencyForDates } = require('./currencies')

const args = process.argv.slice(2)

if (args.length !== 2) {
  throw Error('script requires exactly 2 paramenters: currency & desde')
}

const supportedCurrencies = ['USD', 'EUR']

const currency = args[0]
const desdeString = args[1]

if (!supportedCurrencies.includes(currency)) {
  throw Error(`currency not supported: ${currency}. Please use ${supportedCurrencies.toString()}`)
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

const admin = require('firebase-admin')
require('./local-firebase-admin').initialize(admin)
const db = admin.firestore()

const dates = []
let i = 0
while(desde.clone().add(i, 'days') < today) {
  dates.push(desde.clone().add(i, 'days').format('YYYY-MM-DD'))
  i++
}

injectCurrencyForDates(db, currency, dates)
.then(() => {
  console.log(`finished injecting history for currency ${currency} since ${desdeString}`);
})
