const { cuotaParte } = require('./cafci/api')

const fondosList = [
  { name: 'Mercado-Fondo-A', fondo: 798, clase: 1982 }, // Mercado Fondo clase A
  { name: 'Mercado-Fondo-B', fondo: 798, clase: 1983 }, // Mercado Fondo clase B
  { name: 'Mercado-Fondo-C', fondo: 798, clase: 1984 }, // Mercado Fondo clase C
]

function injectFondos(db, date) {
  const updates = fondosList.map(f => {

    const key = `${f.name}-${date}`

    return cuotaParte(f.fondo, f.clase, date)
    .then(cp => ({
      type: 'fondo',
      name: f.name,
      date: date,
      value: cp
    }))
    .then(datapoint => db.collection('datapoints').doc(key).set(datapoint))
  })

  return Promise.all(updates)
}

module.exports = {
  injectFondos
}
