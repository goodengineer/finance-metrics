const moment = require('moment')
const { injectFondos } = require('./fondos')
const { injectCurrencies } = require('./currencies')

function inject(db) {
  // calculate value for yesterday
  const date = moment().subtract(1, 'days').format('YYYY-MM-DD')

  return injectFondos(db, date)
  .then(() => injectCurrencies(db, date))
  .then(_ => {
    console.log('finished update');
  })
}

module.exports = {
  inject
}
