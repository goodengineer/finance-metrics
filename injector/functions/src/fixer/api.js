const axios = require('axios')

const BASE_URL = 'http://data.fixer.io/api'
const API_KEY = '156039d30a9770991c2e179bbbb689eb'

// e.g: USD, EUR
const rate = (currency, date) => (
  axios.get(`${BASE_URL}/${date}?access_key=${API_KEY}&symbols=ARS,${currency}&format=1`)
  .then(response => response.data)
  .then(data => data.rates['ARS']/data.rates[currency])
)

module.exports = {
  rate
}
