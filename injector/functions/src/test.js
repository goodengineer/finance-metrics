const { injectFondos } = require('./fondos')

const admin = require('firebase-admin')
require('./local-firebase-admin').initialize(admin)
const db = admin.firestore()

injectFondos(db, '2019-06-20')
.then(console.log)
