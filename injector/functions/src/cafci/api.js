const axios = require('axios')
const moment = require('moment')

const BASE_URL = 'https://api.cafci.org.ar'

const fondos = () => axios.get(`${BASE_URL}/fondo?estado=1&limit=0`).then(x=>x.data)
const clases = fondo => axios.get(`${BASE_URL}/fondo?estado=1&include=clase_fondo&limit=0&order=clase_fondos.nombre&id=${fondo}`).then(x=>x.data)
const ficha = (fondo, clase) => axios.get(`${BASE_URL}/fondo/${fondo}/clase/${clase}/ficha`).then(x=>x.data)
const query = (fondo, clase, desde, hasta) => axios.get(`${BASE_URL}/fondo/${fondo}/clase/${clase}/rendimiento/${desde}/${hasta}`).then(x=>x.data)
const cuotaParte = (fondo, clase, date) => {
  const desde = moment(date, 'YYYY-MM-DD').subtract(10, 'days').format('YYYY-MM-DD')
  const hasta = date

  return query(fondo, clase, desde, hasta)
  .then(d => d.data.hasta.valor)
}

module.exports = {
  ficha,
  fondos,
  clases,
  query,
  cuotaParte
}
