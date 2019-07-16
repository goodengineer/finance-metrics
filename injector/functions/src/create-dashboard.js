const admin = require('firebase-admin')
require('./local-firebase-admin').initialize(admin)
const db = admin.firestore()

const handleSnapshot = snapshot => {
  const docs = []

  snapshot.forEach(doc => {
    docs.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return docs
}

const mixVsUsd = {
  name: 'Santander Mix vs USD',
  description: 'Supergestion Mix VI - Clase A compared to USD currency',
  charts: [
    {
      type: 'CR',
      datasets: ['fondo-406-730', 'currency-USD'],
      colors: [
        { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgb(54, 162, 235)' },
        { backgroundColor: 'rgba(75, 192, 192, 0.5)', borderColor: 'rgb(75, 192, 192)' },
        { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'rgb(0, 0, 0)' }
      ]
    },
    {
      type: 'S',
      datasets: ['fondo-406-730'],
      colors: [
        { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgb(54, 162, 235)' }
      ]
    },
    {
      type: 'S',
      datasets: ['currency-USD'],
      colors: [
        { backgroundColor: 'rgba(75, 192, 192, 0.5)', borderColor: 'rgb(75, 192, 192)' }
      ]
    }
  ]
}

const usdVsEur = {
  name: 'USD vs EUR',
  description: 'USD currency compared to EUR currency',
  charts: [
    {
      type: 'CR',
      datasets: ['currency-USD', 'currency-EUR'],
      colors: [
        { backgroundColor: 'rgba(75, 192, 192, 0.5)', borderColor: 'rgb(75, 192, 192)' },
        { backgroundColor: 'rgba(255, 159, 64, 0.5)', borderColor: 'rgb(255, 159, 64)' },
        { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'rgb(0, 0, 0)' }
      ]
    },
    {
      type: 'S',
      datasets: ['currency-USD'],
      colors: [
        { backgroundColor: 'rgba(75, 192, 192, 0.5)', borderColor: 'rgb(75, 192, 192)' }
      ]
    },
    {
      type: 'S',
      datasets: ['currency-EUR'],
      colors: [
        { backgroundColor: 'rgba(255, 159, 64, 0.5)', borderColor: 'rgb(255, 159, 64)' }
      ]
    }
  ]
}

const mixVsMfDashboard = {
  name: 'Santander Mix vs Mercado Fondo',
  description: 'Supergestion Mix VI - Clase A compared to Mercado Fondo - Clase A',
  charts: [
    {
      type: 'CR',
      datasets: ['fondo-406-730', 'fondo-798-1982'],
      colors: [
        { backgroundColor: 'rgba(153, 102, 255, 0.5)', borderColor: 'rgb(153, 102, 255)' },
        { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgb(54, 162, 235)' },
        { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'rgb(0, 0, 0)' }
      ]
    },
    {
      type: 'S',
      datasets: ['fondo-406-730'],
      colors: [
        { backgroundColor: 'rgba(153, 102, 255, 0.5)', borderColor: 'rgb(153, 102, 255)' }
      ]
    },
    {
      type: 'S',
      datasets: ['fondo-798-1982'],
      colors: [
        { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgb(54, 162, 235)' }
      ]
    }
  ]
}

const superAhorroVsMixDashboard = {
  name: 'Super Ahorro PLUS vs Santander Mix',
  description: 'Super Ahorro PLUS A - Clase A compared to Supergestion Mix VI - Clase A',
  charts: [
    {
      type: 'CR',
      datasets: ['fondo-519-1048', 'fondo-406-730'],
      colors: [
        { backgroundColor: 'rgba(153, 102, 255, 0.5)', borderColor: 'rgb(153, 102, 255)' },
        { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgb(54, 162, 235)' },
        { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'rgb(0, 0, 0)' }
      ]
    },
    {
      type: 'S',
      datasets: ['fondo-519-1048'],
      colors: [
        { backgroundColor: 'rgba(153, 102, 255, 0.5)', borderColor: 'rgb(153, 102, 255)' }
      ]
    },
    {
      type: 'S',
      datasets: ['fondo-406-730'],
      colors: [
        { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgb(54, 162, 235)' }
      ]
    }
  ]
}

db.collection('dashboards').add(mixVsUsd)
