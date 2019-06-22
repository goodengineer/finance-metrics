const { rate } = require('./fixer/api')

function injectCurrencies(db, date) {
  return db.collection('datasets').where('type', '==', 'currency').get()
  .then(snapshot => {
    const datasets = []
    snapshot.forEach(doc => {
      datasets.push({ ...doc.data(), id: doc.id })
    })

    const updates = datasets.map(dataset => {
      return injectCurrencyForDates(db, dataset.name, [date])
    })

    return Promise.all(updates)
  })
}

function injectCurrencyForDates(db, currency, dates) {
  const datasetId = `currency-${currency}`
  const dataset = {
    type: 'currency',
    name: currency,
    source: 'https://fixer.io/'
  }
  return db.collection('datasets').doc(datasetId).set(dataset)
  .then(() => {
    const updates = dates.map(date => {
      console.log(`injecting for currency ${currency} at ${date}`)
      const datapointId = `currency-${currency}-${date}`
      return rate(currency, date)
      .then(value => ({
        datasetId,
        type: 'currency',
        date,
        value
      }))
      .then(datapoint => db.collection('datapoints').doc(datapointId).set(datapoint))
    })

    return Promise.all(updates)
  })
}

module.exports = {
  injectCurrencies,
  injectCurrencyForDates
}
