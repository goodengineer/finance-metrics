const { cuotaParte, ficha } = require('./cafci/api')
const moment = require('moment')

/*
* Injects value for every fondo in specified date
*/
function injectFondos(db, date) {
  return db.collection('datasets').where('type', '==', 'fondo').get()
  .then(snapshot => {
    const datasets = []
    snapshot.forEach(doc => {
      datasets.push({ ...doc.data(), id: doc.id })
    })

    const updates = datasets.map(dataset => {
      return injectFondoForDates(db, dataset.metadata.fondo, dataset.metadata.clase, [date])
    })

    return Promise.all(updates)
  })
}

/*
* Injects value for every date in specified fondo
*/
function injectFondoForDates(db, fondo, clase, dates) {
  return ficha(fondo, clase)
  .then(f => {
    const name = f.data.model.nombre

    const id = `fondo-${fondo}-${clase}`
    const dataset = {
      type: 'fondo',
      name,
      source: 'https://www.cafci.org.ar',
      metadata: {
        fondo,
        clase
      }
    }
    return db.collection('datasets').doc(id).set(dataset).then(() => ({ datasetId: id, name }))
  })
  .then(({ datasetId, name }) => {
    const updates = dates.map(date => () => {
      console.log(`injecting for fondo ${fondo}-${clase} at ${date}`)
      const id = `fondo-${fondo}-${clase}-${date}`
      return cuotaParte(fondo, clase, date)
      .then(cp => ({
        datasetId,
        date: moment(date, 'YYYY-MM-DD').valueOf(),
        value: cp
      }))
      .then(datapoint => db.collection('datapoints').doc(id).set(datapoint))
      .catch(e => {
        console.error(`failed to inject fondo ${fondo}-${clase} at ${date}`);
      })
    })

    return updates.reduce((p, f) => p.then(f), Promise.resolve())
  })
}

module.exports = {
  injectFondos,
  injectFondoForDates
}
